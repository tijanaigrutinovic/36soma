import QRCode from "qrcode";
import { asset } from "./asset";

export type InstagramStoryAssets = {
  file: File;
  pngBlob: Blob;
};

type StoryLocale = "en" | "sr";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  font: string,
  maxLines: number,
): string[] {
  ctx.font = font;
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function drawStoryQr(
  ctx: CanvasRenderingContext2D,
  linkUrl: string,
  locale: StoryLocale,
  x: number,
  y: number,
) {
  const qrSize = 132;
  const qrPadding = 14;
  const labelSize = 18;
  const labelGap = 10;
  const boxW = qrSize + qrPadding * 2;
  const boxH = boxW + labelGap + labelSize;

  const qrDataUrl = await QRCode.toDataURL(linkUrl, {
    margin: 0,
    width: qrSize,
    color: { dark: "#0a0a0a", light: "#ffffff" },
  });
  const qrImg = await loadImage(qrDataUrl);

  drawRoundedRect(ctx, x, y, boxW, boxH, 14);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.drawImage(qrImg, x + qrPadding, y + qrPadding, qrSize, qrSize);

  ctx.fillStyle = "#0a0a0a";
  ctx.font = `600 ${labelSize}px "IBM Plex Sans", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(locale === "sr" ? "Skeniraj link" : "Scan for link", x + boxW / 2, y + boxW + labelGap + labelSize - 4);
  ctx.textAlign = "left";
}

export async function buildInstagramStoryImage(
  imagePath: string,
  pageUrl: string,
  title: string,
  linkUrl: string,
  locale: StoryLocale = "en",
): Promise<InstagramStoryAssets | null> {
  try {
    const imageUrl = new URL(asset(imagePath), pageUrl).href;
    const img = await loadImage(imageUrl);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const storyW = 1080;
    const storyH = 1920;
    canvas.width = storyW;
    canvas.height = storyH;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, storyW, storyH);

    const imgTop = 160;
    const maxImgH = 1180;
    const imgScale = Math.min(storyW / img.width, maxImgH / img.height);
    const drawW = Math.round(img.width * imgScale);
    const drawH = Math.round(img.height * imgScale);
    const drawX = Math.round((storyW - drawW) / 2);
    const drawY = imgTop;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    const panelTop = drawY + drawH + 36;
    const padX = 56;
    const padY = 40;
    const titleSize = 44;
    const urlSize = 24;
    const titleFont = `700 ${titleSize}px Syne, system-ui, sans-serif`;
    const urlFont = `500 ${urlSize}px "IBM Plex Sans", system-ui, sans-serif`;
    const brandFont = `700 ${urlSize}px Syne, system-ui, sans-serif`;
    const titleLineH = titleSize * 1.28;

    ctx.fillStyle = "#ff5c00";
    ctx.fillRect(padX, panelTop, storyW - padX * 2, 3);

    const titleLines = wrapText(ctx, title, storyW - padX * 2, titleFont, 3);
    const displayUrl = linkUrl.replace(/^https?:\/\//, "");

    ctx.fillStyle = "#f5f5f5";
    ctx.font = titleFont;
    titleLines.forEach((line, i) => {
      ctx.fillText(line, padX, panelTop + padY + titleSize + i * titleLineH);
    });

    ctx.fillStyle = "#b5b5b5";
    ctx.font = urlFont;
    ctx.fillText(displayUrl, padX, panelTop + padY + titleLines.length * titleLineH + titleSize + 20);

    await drawStoryQr(ctx, linkUrl, locale, padX, storyH - 300);

    ctx.fillStyle = "#ff5c00";
    ctx.font = brandFont;
    ctx.textAlign = "right";
    ctx.fillText("36Soma Runners", storyW - padX, storyH - 72);
    ctx.textAlign = "left";

    const [jpegBlob, pngBlob] = await Promise.all([
      canvasToBlob(canvas, "image/jpeg", 0.92),
      canvasToBlob(canvas, "image/png"),
    ]);

    if (!jpegBlob || !pngBlob) return null;

    return {
      file: new File([jpegBlob], "36soma-story.jpg", { type: "image/jpeg" }),
      pngBlob,
    };
  } catch {
    return null;
  }
}

export async function copyPostLink(url: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return false;
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

export async function copyImageBlobToClipboard(pngBlob: Blob): Promise<boolean> {
  if (!navigator.clipboard?.write) return false;
  try {
    await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
    return true;
  } catch {
    return false;
  }
}

export async function shareImageFile(
  file: File,
  meta?: { title?: string; url?: string },
): Promise<"shared" | "aborted" | "failed"> {
  if (!navigator.share) return "failed";

  const withMeta: ShareData = {
    files: [file],
    ...(meta?.title ? { title: meta.title } : {}),
    ...(meta?.url ? { url: meta.url, text: meta.url } : {}),
  };

  try {
    if (!navigator.canShare || navigator.canShare(withMeta)) {
      await navigator.share(withMeta);
      return "shared";
    }
    await navigator.share({ files: [file] });
    return "shared";
  } catch (err) {
    if ((err as Error).name === "AbortError") return "aborted";
    try {
      await navigator.share({ files: [file] });
      return "shared";
    } catch (retryErr) {
      if ((retryErr as Error).name === "AbortError") return "aborted";
      return "failed";
    }
  }
}

export function openInstagramApp() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    window.location.href = "instagram://story-camera";
    window.setTimeout(() => {
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }, 700);
    return;
  }
  if (/Android/i.test(ua)) {
    window.location.href =
      "intent://share/#Intent;package=com.instagram.android;scheme=instagram;end";
    return;
  }
  window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
}

export function isMobileDevice(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
