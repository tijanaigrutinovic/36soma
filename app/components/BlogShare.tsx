"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  buildInstagramStoryImage,
  copyImageBlobToClipboard,
  copyPostLink,
  isMobileDevice,
  openInstagramApp,
  shareImageFile,
} from "../lib/instagramShareImage";
import type { BlogLocale } from "../lib/blog";
import { openSocialShare } from "../lib/socialShare";

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
    instagramPickStory: "Pick Instagram, then Story. Link is copied — add Link sticker and paste.",
    instagramPaste:
      "Image copied — paste in Story. Link is copied for the Link sticker; QR on image opens the post.",
    instagramLinkReady:
      "Link copied — in Story add Link sticker and paste. Viewers can also scan the QR on the image.",
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
    instagramPickStory: "Izaberi Instagram, pa Story. Link je kopiran — dodaj Link nalepnicu i nalepi.",
    instagramPaste:
      "Slika je kopirana — nalepi u Story. Link je kopiran za Link nalepnicu; QR na slici vodi na tekst.",
    instagramLinkReady:
      "Link je kopiran — u Story-ju dodaj Link nalepnicu i nalepi. QR na slici vodi direktno na tekst.",
    instagramDesktop:
      "Instagram Story radi sa telefona — otvori ovaj tekst na mobilnom i klikni Podeli.",
    instagramFailed: "Deljenje nije uspelo — probaj ponovo u Safariju ili Chrome-u na telefonu.",
  },
} as const;

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

    const assets = await buildInstagramStoryImage(image, url, title, url, locale);
    if (!assets) {
      showStatus(t.instagramFailed);
      return;
    }

    await copyPostLink(url);

    const shareResult = await shareImageFile(assets.file, { title, url });
    if (shareResult === "shared") {
      showStatus(t.instagramLinkReady);
      return;
    }
    if (shareResult === "aborted") {
      setOpen(false);
      return;
    }

    const pasted = await copyImageBlobToClipboard(assets.pngBlob);
    if (pasted) {
      await copyPostLink(url);
      openInstagramApp();
      showStatus(t.instagramPaste);
      return;
    }

    await copyPostLink(url);
    showStatus(t.instagramPickStory);
  }, [
    image,
    locale,
    showStatus,
    t.instagramDesktop,
    t.instagramFailed,
    t.instagramLinkReady,
    t.instagramPaste,
    t.instagramPickStory,
    title,
    url,
  ]);

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
            <button
              key={net.id}
              type="button"
              className="blog-share__item"
              role="menuitem"
              onClick={() => {
                openSocialShare(net.id, url, title);
                setOpen(false);
              }}
            >
              {net.label}
            </button>
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
