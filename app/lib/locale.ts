import { basePath } from "./asset";
import { blogPostPath, type BlogLocale } from "./blog";

export type SiteLocale = BlogLocale;

const FALLBACK_REPO_BASE = "/36soma";

export function normalizePathname(pathname: string): string {
  let path = pathname.replace(/\/$/, "") || "/";

  for (const prefix of [basePath, FALLBACK_REPO_BASE]) {
    if (!prefix) continue;
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      path = path.slice(prefix.length) || "/";
      break;
    }
  }

  return path;
}

export function localeFromPathname(pathname: string): SiteLocale {
  const path = normalizePathname(pathname);
  return path === "/sr" || path.startsWith("/sr/") ? "sr" : "en";
}

export function localeSwitchTargets(pathname: string): { en: string; sr: string } {
  const path = normalizePathname(pathname);

  if (path === "/contact") {
    return { en: "/contact/", sr: "/sr/contact/" };
  }
  if (path === "/sr/contact") {
    return { en: "/contact/", sr: "/sr/contact/" };
  }

  if (path === "/blog" || path.startsWith("/blog/")) {
    const slug = path.replace(/^\/blog\/?/, "");
    return slug
      ? { en: `/blog/${slug}/`, sr: `/sr/blog/${slug}/` }
      : { en: "/blog/", sr: "/sr/blog/" };
  }
  if (path === "/sr/blog" || path.startsWith("/sr/blog/")) {
    const slug = path.replace(/^\/sr\/blog\/?/, "");
    return slug
      ? { en: `/blog/${slug}/`, sr: `/sr/blog/${slug}/` }
      : { en: "/blog/", sr: "/sr/blog/" };
  }

  return { en: "/", sr: "/sr/" };
}

export function blogPostAlternatePath(slug: string, locale: SiteLocale): string {
  return blogPostPath(locale, slug);
}
