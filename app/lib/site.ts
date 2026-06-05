import { asset, basePath } from "./asset";

/** Public origin without trailing slash, e.g. https://tijanaigrutinovic.github.io */
export function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
}

export function absoluteSitePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withBase = asset(normalized);
  const origin = siteOrigin();
  return origin ? `${origin}${withBase}` : withBase;
}

export function metadataBaseUrl(): URL | undefined {
  const origin = siteOrigin();
  if (!origin) return undefined;
  return new URL(`${origin}${basePath}/`);
}
