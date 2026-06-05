"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { asset } from "../lib/asset";
import type { BlogLocale } from "../lib/blog";

type BlogShareProps = {
  title: string;
  locale?: BlogLocale;
  image?: string;
};

const copy = {
  en: {
    share: "Share",
    sharePost: "Share this post",
    copy: "Copy link",
    copied: "Copied",
    native: "Share via…",
    x: "X",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    instagramHint: "Create Instagram post with this article image",
    instagramFallback:
      "Image saved and caption copied — open Instagram, upload the image, paste the caption.",
  },
  sr: {
    share: "Podeli",
    sharePost: "Podeli ovaj tekst",
    copy: "Kopiraj link",
    copied: "Kopirano",
    native: "Podeli preko…",
    x: "X",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    instagramHint: "Napravi Instagram objavu sa slikom teksta",
    instagramFallback:
      "Slika sačuvana i tekst kopiran — otvori Instagram, ubaci sliku i nalepi opis.",
  },
} as const;

function shareUrl(platform: string, url: string, title: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedBoth = encodeURIComponent(`${title} ${url}`);

  switch (platform) {
    case "x":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodedBoth}`;
    default:
      return url;
  }
}

function captionFor(title: string, url: string): string {
  return `${title}\n\n${url}`;
}

async function fetchImageFile(imagePath: string, pageUrl: string): Promise<File | null> {
  try {
    const imageUrl = new URL(asset(imagePath), pageUrl).href;
    const res = await fetch(imageUrl);
    if (!res.ok) return null;
    const blob = await res.blob();
    const ext = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
    return new File([blob], `36soma-blog.${ext}`, { type: blob.type || "image/jpeg" });
  } catch {
    return null;
  }
}

function downloadImage(imagePath: string, pageUrl: string) {
  const imageUrl = new URL(asset(imagePath), pageUrl).href;
  const a = document.createElement("a");
  a.href = imageUrl;
  a.download = "36soma-blog.webp";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function BlogShare({ title, locale = "en", image }: BlogShareProps) {
  const t = locale === "sr" ? copy.sr : copy.en;
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const copyLink = useCallback(async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* private mode */
    }
  }, [url]);

  const shareInstagram = useCallback(async () => {
    if (!url) return;
    const caption = captionFor(title, url);

    if (image && navigator.share) {
      const file = await fetchImageFile(image, url);
      if (file) {
        const payload: ShareData = { files: [file], title, text: caption };
        const canShareFiles = !navigator.canShare || navigator.canShare(payload);
        if (canShareFiles) {
          try {
            await navigator.share(payload);
            setOpen(false);
            setStatus(null);
            return;
          } catch (err) {
            if ((err as Error).name === "AbortError") {
              setOpen(false);
              return;
            }
          }
        }
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({ title, text: caption, url });
        setOpen(false);
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setOpen(false);
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
    } catch {
      /* clipboard blocked */
    }

    if (image) downloadImage(image, url);

    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    setStatus(t.instagramFallback);
    setOpen(false);
    window.setTimeout(() => {
      setCopied(false);
      setStatus(null);
    }, 5000);
  }, [image, t.instagramFallback, title, url]);

  const nativeShare = useCallback(async () => {
    if (!url || !navigator.share) return;
    try {
      await navigator.share({ title, url });
      setOpen(false);
    } catch (err) {
      if ((err as Error).name !== "AbortError") setOpen(true);
    }
  }, [title, url]);

  const networks = [
    { id: "x", label: t.x },
    { id: "facebook", label: t.facebook },
    { id: "linkedin", label: t.linkedin },
    { id: "whatsapp", label: t.whatsapp },
  ] as const;

  return (
    <div className="blog-share" ref={rootRef}>
      <button
        type="button"
        className="blog-share__trigger"
        aria-label={t.sharePost}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="blog-share__trigger-icon" aria-hidden="true">
          ↗
        </span>
        {t.share}
      </button>

      {status ? (
        <p className="blog-share__status" role="status">
          {status}
        </p>
      ) : null}

      {open ? (
        <div id={menuId} className="blog-share__menu" role="menu" aria-label={t.sharePost}>
          {canNativeShare ? (
            <button type="button" className="blog-share__item" role="menuitem" onClick={() => void nativeShare()}>
              {t.native}
            </button>
          ) : null}
          {networks.map((net) => (
            <a
              key={net.id}
              className="blog-share__item"
              role="menuitem"
              href={shareUrl(net.id, url, title)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              {net.label}
            </a>
          ))}
          <button
            type="button"
            className="blog-share__item"
            role="menuitem"
            aria-label={t.instagramHint}
            onClick={() => void shareInstagram()}
          >
            {t.instagram}
          </button>
          <button type="button" className="blog-share__item blog-share__item--copy" role="menuitem" onClick={() => void copyLink()}>
            {copied ? t.copied : t.copy}
          </button>
        </div>
      ) : null}
    </div>
  );
}
