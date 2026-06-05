import { asset } from "./asset";

export type InstagramStoryAssets = {
  file: File;
  previewUrl: string;
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
    const hintSize = 20;
    const titleFont = `700 ${titleSize}px Syne, system-ui, sans-serif`;
    const urlFont = `500 ${urlSize}px "IBM Plex Sans", system-ui, sans-serif`;
    const hintFont = `500 ${hintSize}px "IBM Plex Sans", system-ui, sans-serif`;
    const brandFont = `700 ${urlSize}px Syne, system-ui, sans-serif`;
    const titleLineH = titleSize * 1.28;
    const displayUrl = linkUrl.replace(/^https?:\/\//, "");

    ctx.fillStyle = "#ff5c00";
    ctx.fillRect(padX, panelTop, storyW - padX * 2, 3);

    const titleLines = wrapText(ctx, title, storyW - padX * 2, titleFont, 3);

    ctx.fillStyle = "#f5f5f5";
    ctx.font = titleFont;
    titleLines.forEach((line, i) => {
      ctx.fillText(line, padX, panelTop + padY + titleSize + i * titleLineH);
    });

    ctx.fillStyle = "#b5b5b5";
    ctx.font = urlFont;
    ctx.fillText(displayUrl, padX, panelTop + padY + titleLines.length * titleLineH + titleSize + 20);

    ctx.fillStyle = "#888888";
    ctx.font = hintFont;
    ctx.fillText(
      locale === "sr" ? "Dodaj Link nalepnicu u Story-ju" : "Add Link sticker in Story",
      padX,
      storyH - 120,
    );

    ctx.fillStyle = "#ff5c00";
    ctx.font = brandFont;
    ctx.textAlign = "right";
    ctx.fillText("36Soma Runners", storyW - padX, storyH - 72);
    ctx.textAlign = "left";

    const jpegBlob = await canvasToBlob(canvas, "image/jpeg", 0.92);
    if (!jpegBlob) return null;

    const file = new File([jpegBlob], "36soma-story.jpg", { type: "image/jpeg" });
    return {
      file,
      previewUrl: URL.createObjectURL(file),
    };
  } catch {
    return null;
  }
}

export function revokeStoryPreview(assets: InstagramStoryAssets | null) {
  if (assets?.previewUrl) URL.revokeObjectURL(assets.previewUrl);
}

export function downloadStoryImage(file: File) {
  const url = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = file.name;
  anchor.click();
  URL.revokeObjectURL(url);
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

export function openInstagramApp() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) {
    window.location.href = "instagram://story-camera";
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
