export type SocialPlatform = "x" | "facebook" | "linkedin" | "whatsapp";

type SharePayload = {
  url: string;
  title: string;
  encodedUrl: string;
  encodedTitle: string;
  encodedBoth: string;
  encodedMessage: string;
};

function buildPayload(url: string, title: string): SharePayload {
  return {
    url,
    title,
    encodedUrl: encodeURIComponent(url),
    encodedTitle: encodeURIComponent(title),
    encodedBoth: encodeURIComponent(`${title} ${url}`),
    encodedMessage: encodeURIComponent(`${title} ${url}`),
  };
}

function getLinkedInShareUrl(url: string, title: string): string {
  const text = encodeURIComponent(`${title}\n\n${url}`);
  return `https://www.linkedin.com/feed/?shareActive&mini=true&text=${text}`;
}

export function getSocialShareWebUrl(platform: SocialPlatform, url: string, title: string): string {
  const p = buildPayload(url, title);

  switch (platform) {
    case "x":
      return `https://twitter.com/intent/tweet?url=${p.encodedUrl}&text=${p.encodedTitle}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${p.encodedUrl}`;
    case "linkedin":
      return getLinkedInShareUrl(url, title);
    case "whatsapp":
      return `https://wa.me/?text=${p.encodedBoth}`;
    default:
      return url;
  }
}

function isMobileUserAgent(ua: string): boolean {
  return /iPhone|iPad|iPod|Android/i.test(ua);
}

function isIOS(ua: string): boolean {
  return /iPhone|iPad|iPod/i.test(ua);
}

function isAndroid(ua: string): boolean {
  return /Android/i.test(ua);
}

function getAppShareUrls(platform: SocialPlatform, p: SharePayload, ua: string): string[] {
  if (isIOS(ua)) {
    switch (platform) {
      case "whatsapp":
        return [`whatsapp://send?text=${p.encodedBoth}`];
      case "x":
        return [
          `x-twitter://post?message=${p.encodedMessage}`,
          `twitter://post?message=${p.encodedMessage}`,
        ];
      case "linkedin":
        return [];
      case "facebook":
        return [`fb://share/?link=${p.encodedUrl}`];
      default:
        return [];
    }
  }

  if (isAndroid(ua)) {
    const web = getSocialShareWebUrl(platform, p.url, p.title);
    const fallback = encodeURIComponent(web);

    switch (platform) {
      case "whatsapp":
        return [`whatsapp://send?text=${p.encodedBoth}`];
      case "x":
        return [
          `intent://twitter.com/intent/tweet?text=${p.encodedMessage}#Intent;package=com.twitter.android;scheme=https;S.browser_fallback_url=${fallback};end`,
        ];
      case "linkedin":
        return [];
      case "facebook":
        return [
          `intent://www.facebook.com/sharer/sharer.php?u=${p.encodedUrl}#Intent;package=com.facebook.katana;scheme=https;S.browser_fallback_url=${fallback};end`,
        ];
      default:
        return [];
    }
  }

  return [];
}

function openWebShare(platform: SocialPlatform, url: string, title: string) {
  const webUrl = getSocialShareWebUrl(platform, url, title);
  window.open(webUrl, "_blank", "noopener,noreferrer");
}

function tryAppUrls(appUrls: string[], webFallback: () => void) {
  let index = 0;

  const tryNext = () => {
    if (index >= appUrls.length) {
      webFallback();
      return;
    }

    const appUrl = appUrls[index];
    index += 1;

    let opened = false;
    const timer = window.setTimeout(() => {
      if (!opened) tryNext();
    }, 550);

    const cancel = () => {
      opened = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", cancel);
    };

    const onVisibility = () => {
      if (document.hidden) cancel();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", cancel);

    window.location.href = appUrl;
  };

  tryNext();
}

function openLinkedInShare(url: string, title: string, mobile: boolean) {
  const shareUrl = getLinkedInShareUrl(url, title);
  if (mobile) {
    window.location.assign(shareUrl);
    return;
  }
  window.open(shareUrl, "_blank", "noopener,noreferrer");
}

export function openSocialShare(platform: SocialPlatform, url: string, title: string) {
  if (!url || typeof window === "undefined") return;

  const ua = navigator.userAgent;
  const mobile = isMobileUserAgent(ua);

  if (platform === "linkedin") {
    openLinkedInShare(url, title, mobile);
    return;
  }

  if (!mobile) {
    openWebShare(platform, url, title);
    return;
  }

  const payload = buildPayload(url, title);
  const appUrls = getAppShareUrls(platform, payload, ua);

  if (appUrls.length === 0) {
    window.location.href = getSocialShareWebUrl(platform, url, title);
    return;
  }

  tryAppUrls(appUrls, () => openWebShare(platform, url, title));
}
