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

export function getSocialShareWebUrl(platform: SocialPlatform, url: string, title: string): string {
  const p = buildPayload(url, title);

  switch (platform) {
    case "x":
      return `https://twitter.com/intent/tweet?url=${p.encodedUrl}&text=${p.encodedTitle}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${p.encodedUrl}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${p.encodedUrl}`;
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

type MobileShareTarget = {
  /** Custom scheme / intent — try first, fall back to web if app missing */
  appUrls: string[];
  /** HTTPS universal link — opens app when installed, otherwise mobile web */
  universalUrl?: string;
};

function getMobileShareTarget(platform: SocialPlatform, p: SharePayload, ua: string): MobileShareTarget {
  const webUrl = getSocialShareWebUrl(platform, p.url, p.title);
  const webFallback = encodeURIComponent(webUrl);

  if (isIOS(ua)) {
    switch (platform) {
      case "whatsapp":
        return {
          appUrls: [`whatsapp://send?text=${p.encodedBoth}`],
          universalUrl: webUrl,
        };
      case "x":
        return {
          appUrls: [
            `x-twitter://post?message=${p.encodedMessage}`,
            `twitter://post?message=${p.encodedMessage}`,
          ],
          universalUrl: webUrl,
        };
      case "facebook":
        return {
          appUrls: [`fb://share/?link=${p.encodedUrl}`],
          universalUrl: webUrl,
        };
      case "linkedin":
        return {
          appUrls: [],
          universalUrl: webUrl,
        };
      default:
        return { appUrls: [] };
    }
  }

  if (isAndroid(ua)) {
    switch (platform) {
      case "whatsapp":
        return {
          appUrls: [`whatsapp://send?text=${p.encodedBoth}`],
          universalUrl: webUrl,
        };
      case "x":
        return {
          appUrls: [
            `intent://twitter.com/intent/tweet?text=${p.encodedMessage}#Intent;package=com.twitter.android;scheme=https;S.browser_fallback_url=${webFallback};end`,
          ],
        };
      case "facebook":
        return {
          appUrls: [
            `intent://www.facebook.com/sharer/sharer.php?u=${p.encodedUrl}#Intent;package=com.facebook.katana;scheme=https;S.browser_fallback_url=${webFallback};end`,
          ],
        };
      case "linkedin":
        return {
          appUrls: [
            `intent://www.linkedin.com/sharing/share-offsite/?url=${p.encodedUrl}#Intent;package=com.linkedin.android;scheme=https;S.browser_fallback_url=${webFallback};end`,
          ],
        };
      default:
        return { appUrls: [] };
    }
  }

  return { appUrls: [] };
}

function openWebShare(platform: SocialPlatform, url: string, title: string) {
  const webUrl = getSocialShareWebUrl(platform, url, title);
  window.open(webUrl, "_blank", "noopener,noreferrer");
}

function tryAppDeepLinks(appUrls: string[], onFallback: () => void) {
  let index = 0;

  const tryNext = () => {
    if (index >= appUrls.length) {
      onFallback();
      return;
    }

    const appUrl = appUrls[index];
    index += 1;

    let handled = false;
    const timer = window.setTimeout(() => {
      if (!handled) tryNext();
    }, 700);

    const cancel = () => {
      handled = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", cancel);
      window.removeEventListener("blur", onBlur);
    };

    const onVisibility = () => {
      if (document.hidden) cancel();
    };

    const onBlur = () => {
      window.setTimeout(() => {
        if (document.hidden) cancel();
      }, 80);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", cancel);
    window.addEventListener("blur", onBlur);

    window.location.href = appUrl;
  };

  tryNext();
}

function openMobileShare(platform: SocialPlatform, url: string, title: string) {
  const payload = buildPayload(url, title);
  const target = getMobileShareTarget(platform, payload, navigator.userAgent);
  const webUrl = getSocialShareWebUrl(platform, url, title);

  const openWeb = () => openWebShare(platform, url, title);

  if (target.appUrls.length > 0) {
    tryAppDeepLinks(target.appUrls, () => {
      if (target.universalUrl) {
        window.location.assign(target.universalUrl);
        return;
      }
      openWeb();
    });
    return;
  }

  if (target.universalUrl) {
    window.location.assign(target.universalUrl);
    return;
  }

  openWeb();
}

export function openSocialShare(platform: SocialPlatform, url: string, title: string) {
  if (!url || typeof window === "undefined") return;

  if (isMobileUserAgent(navigator.userAgent)) {
    openMobileShare(platform, url, title);
    return;
  }

  openWebShare(platform, url, title);
}
