"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  buildInstagramStoryImage,
  copyImageBlobToClipboard,
  isMobileDevice,
  openInstagramApp,
  shareImageFile,
} from "../lib/instagramShareImage";
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
    instagram: "Instagram Story",
    instagramHint: "Share as Instagram Story",
    instagramPickStory: "Pick Instagram, then Story in the share menu.",
    instagramPaste:
      "Image copied — open Instagram Story and paste (long-press on the canvas).",
    instagramDesktop: "Instagram Story works on your phone — open this post on mobile and tap Share.",
    instagramFailed: "Could not open share — try again in Safari or Chrome on your phone.",
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
    instagram: "Instagram Story",
    instagramHint: "Podeli kao Instagram Story",
    instagramPickStory: "Izaberi Instagram, pa Story u meniju za deljenje.",
    instagramPaste:
      "Slika je kopirana — otvori Instagram Story i nalepi (dugi pritisak na ekran).",
    instagramDesktop:
      "Instagram Story radi sa telefona — otvori ovaj tekst na mobilnom i klikni Podeli.",
    instagramFailed: "Deljenje nije uspelo — probaj ponovo u Safariju ili Chrome-u na telefonu.",
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

  const showStatus = useCallback((message: string) => {
    setStatus(message);
    setOpen(false);
    window.setTimeout(() => setStatus(null), 6000);
  }, []);

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
    if (!url || !image) return;

    if (!isMobileDevice()) {
      showStatus(t.instagramDesktop);
      return;
    }

    const assets = await buildInstagramStoryImage(image, url, title, url);
    if (!assets) {
      showStatus(t.instagramFailed);
      return;
    }

    const shareResult = await shareImageFile(assets.file);
    if (shareResult === "shared") {
      setOpen(false);
      setStatus(null);
      return;
    }
    if (shareResult === "aborted") {
      setOpen(false);
      return;
    }

    const pasted = await copyImageBlobToClipboard(assets.pngBlob);
    if (pasted) {
      openInstagramApp();
      showStatus(t.instagramPaste);
      return;
    }

    showStatus(t.instagramPickStory);
  }, [image, showStatus, t.instagramDesktop, t.instagramFailed, t.instagramPaste, t.instagramPickStory, title, url]);

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
          {image ? (
            <button
              type="button"
              className="blog-share__item"
              role="menuitem"
              aria-label={t.instagramHint}
              onClick={() => void shareInstagram()}
            >
              {t.instagram}
            </button>
          ) : null}
          <button type="button" className="blog-share__item blog-share__item--copy" role="menuitem" onClick={() => void copyLink()}>
            {copied ? t.copied : t.copy}
          </button>
        </div>
      ) : null}
    </div>
  );
}
