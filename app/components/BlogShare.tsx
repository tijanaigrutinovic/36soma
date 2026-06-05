"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  buildInstagramStoryImage,
  copyPostLink,
  downloadStoryImage,
  isMobileDevice,
  openInstagramApp,
  revokeStoryPreview,
  type InstagramStoryAssets,
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
    instagramHint: "Create Instagram Story image",
    instagramFailed: "Could not create story image — try again.",
    storyTitle: "Instagram Story",
    storyClose: "Close",
    storyGenerating: "Creating story image…",
    storyStep1: "Download the story image",
    storyStep2: "Post it on your Instagram Story",
    storyStep3: "Add Link sticker and paste the link below",
    storyLinkSticker: "Link sticker",
    storyDownload: "Download image",
    storyOpenIg: "Open Instagram",
    storyLinkCopied: "Link copied — paste into Link sticker",
    storyCopyLink: "Copy link again",
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
    instagramHint: "Napravi Instagram Story sliku",
    instagramFailed: "Slika nije kreirana — probaj ponovo.",
    storyTitle: "Instagram Story",
    storyClose: "Zatvori",
    storyGenerating: "Pravim story sliku…",
    storyStep1: "Preuzmi story sliku",
    storyStep2: "Postavi je na Instagram Story",
    storyStep3: "Dodaj Link nalepnicu i nalepi link ispod",
    storyLinkSticker: "Link nalepnica",
    storyDownload: "Preuzmi sliku",
    storyOpenIg: "Otvori Instagram",
    storyLinkCopied: "Link je kopiran — nalepi u Link nalepnicu",
    storyCopyLink: "Kopiraj link ponovo",
  },
} as const;

export function BlogShare({ title, locale = "en", image }: BlogShareProps) {
  const t = locale === "sr" ? copy.sr : copy.en;
  const menuId = useId();
  const storyDialogId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyAssets, setStoryAssets] = useState<InstagramStoryAssets | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  const closeStoryPanel = useCallback(() => {
    setStoryOpen(false);
    setStoryAssets((prev) => {
      revokeStoryPreview(prev);
      return null;
    });
    setLinkCopied(false);
  }, []);

  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!open && !storyOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        closeStoryPanel();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeStoryPanel, open, storyOpen]);

  useEffect(() => {
    return () => revokeStoryPreview(storyAssets);
  }, [storyAssets]);

  const copyLink = useCallback(async () => {
    if (!url) return;
    const ok = await copyPostLink(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const copyStoryLink = useCallback(async () => {
    if (!url) return;
    const ok = await copyPostLink(url);
    if (ok) {
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2500);
    }
  }, [url]);

  const openInstagramStory = useCallback(async () => {
    if (!url || !image) return;

    setOpen(false);
    setStoryOpen(true);
    setStoryLoading(true);
    setStoryAssets((prev) => {
      revokeStoryPreview(prev);
      return null;
    });

    const assets = await buildInstagramStoryImage(image, url, title, url, locale);
    if (!assets) {
      setStoryLoading(false);
      setStoryOpen(false);
      return;
    }

    await copyPostLink(url);
    setLinkCopied(true);
    setStoryAssets(assets);
    setStoryLoading(false);
  }, [image, locale, title, url]);

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

  const displayUrl = url.replace(/^https?:\/\//, "");

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
              onClick={() => void openInstagramStory()}
            >
              {t.instagram}
            </button>
          ) : null}
          <button type="button" className="blog-share__item blog-share__item--copy" role="menuitem" onClick={() => void copyLink()}>
            {copied ? t.copied : t.copy}
          </button>
        </div>
      ) : null}

      {storyOpen ? (
        <div className="blog-share__story-backdrop" onClick={closeStoryPanel}>
          <div
            id={storyDialogId}
            className="blog-share__story"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${storyDialogId}-title`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="blog-share__story-head">
              <h3 id={`${storyDialogId}-title`} className="blog-share__story-title">
                {t.storyTitle}
              </h3>
              <button type="button" className="blog-share__story-close" onClick={closeStoryPanel}>
                {t.storyClose}
              </button>
            </div>

            {storyLoading ? (
              <p className="blog-share__story-loading">{t.storyGenerating}</p>
            ) : storyAssets ? (
              <>
                <img
                  className="blog-share__story-preview"
                  src={storyAssets.previewUrl}
                  alt={title}
                  width={270}
                  height={480}
                />

                <ol className="blog-share__story-steps">
                  <li>{t.storyStep1}</li>
                  <li>{t.storyStep2}</li>
                  <li>{t.storyStep3}</li>
                </ol>

                <p className="blog-share__story-link-label">{t.storyLinkSticker}</p>
                <p className="blog-share__story-link">
                  <span className="blog-share__story-link-arrow" aria-hidden="true">
                    →
                  </span>
                  <code>{displayUrl}</code>
                </p>
                {linkCopied ? <p className="blog-share__story-note">{t.storyLinkCopied}</p> : null}

                <div className="blog-share__story-actions">
                  <button
                    type="button"
                    className="blog-share__story-btn blog-share__story-btn--primary"
                    onClick={() => downloadStoryImage(storyAssets.file)}
                  >
                    {t.storyDownload}
                  </button>
                  <button type="button" className="blog-share__story-btn" onClick={() => void copyStoryLink()}>
                    {linkCopied ? t.copied : t.storyCopyLink}
                  </button>
                  {isMobileDevice() ? (
                    <button
                      type="button"
                      className="blog-share__story-btn"
                      onClick={() => {
                        downloadStoryImage(storyAssets.file);
                        openInstagramApp();
                      }}
                    >
                      {t.storyOpenIg}
                    </button>
                  ) : null}
                </div>
              </>
            ) : (
              <p className="blog-share__story-loading">{t.instagramFailed}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
