import type { Metadata } from "next";
import { asset, basePath } from "./asset";
import type { BlogLocale, BlogPost } from "./blog";

function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://36soma.github.io").replace(/\/$/, "");
}

export function getBlogPostUrl(slug: string, locale: BlogLocale): string {
  const segment = locale === "sr" ? `/sr/blog/${slug}/` : `/blog/${slug}/`;
  return `${siteOrigin()}${basePath}${segment}`;
}

function absoluteAsset(path: string): string {
  return `${siteOrigin()}${asset(path)}`;
}

export function getBlogPostMetadata(post: BlogPost, locale: BlogLocale): Metadata {
  const title = post.title[locale];
  const description = post.excerpt[locale];
  const pageUrl = getBlogPostUrl(post.slug, locale);
  const imagePath = post.image ?? post.imageCover;
  const ogImage = imagePath ? absoluteAsset(imagePath) : undefined;

  const enUrl = getBlogPostUrl(post.slug, "en");
  const srUrl = getBlogPostUrl(post.slug, "sr");

  return {
    title: `${title} | 36Soma Runners`,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: enUrl,
        sr: srUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "article",
      locale: locale === "sr" ? "sr_RS" : "en_US",
      url: pageUrl,
      title,
      description,
      siteName: "36Soma Runners",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
