import Link from "next/link";
import {
  BLOG_TAGS,
  blogPostPath,
  formatBlogDate,
  type BlogLocale,
  type BlogPost,
} from "../lib/blog";
import { SiteImage } from "./SiteImage";

type BlogPostViewProps = {
  post: BlogPost;
  locale?: BlogLocale;
};

export function BlogPostView({ post, locale = "en" }: BlogPostViewProps) {
  const isSr = locale === "sr";

  return (
    <article className="section section--blog-post">
      <div className="section__inner blog-post__inner">
        <header className="blog-post__meta">
          <Link href={blogPostPath(locale)} className="blog-post__back">
            {isSr ? "← Nazad na blog" : "← Back to blog"}
          </Link>
          <time className="blog-post__date" dateTime={post.date}>
            {formatBlogDate(post.date, locale)}
          </time>
        </header>
        <h1 className="section__heading section__heading--xl blog-post__title">{post.title[locale]}</h1>
        <ul className="blog__tags blog__tags--post" aria-label={isSr ? "Oznake" : "Tags"}>
          {post.tags.map((tag) => (
            <li key={tag}>
              <span className="blog__tag">{BLOG_TAGS[tag].label[locale]}</span>
            </li>
          ))}
        </ul>
        {post.image ? (
          <figure
            className={
              post.heroFullHeight ? "blog-post__hero blog-post__hero--full" : "blog-post__hero"
            }
          >
            <SiteImage
              src={post.image}
              alt={post.title[locale]}
              width={post.heroFullHeight ? 900 : 1200}
              height={post.heroFullHeight ? 1350 : 800}
              loading="eager"
              decoding="async"
            />
          </figure>
        ) : null}
        <div className="blog-post__content">
          {post.body[locale].map((block, i) => {
            const mid =
              post.imageMid?.afterIndex === i ? (
                <figure
                  key={`img-${i}`}
                  className={[
                    "blog-post__figure",
                    post.imageMid.figureClass,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <SiteImage
                    src={post.imageMid.src}
                    alt={post.imageMid.alt[locale]}
                    width={post.imageMid.width ?? 1200}
                    height={post.imageMid.height ?? 800}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ) : null;

            if (block.startsWith("## ")) {
              return (
                <div key={i}>
                  {mid}
                  <h2 className="blog-post__h2">{block.slice(3)}</h2>
                </div>
              );
            }

            return (
              <div key={i}>
                <p className="blog-post__p">{block}</p>
                {mid}
              </div>
            );
          })}
        </div>
        <p className="blog-post__follow cta__text">
          {isSr ? (
            <>
              Zaprati nas na{" "}
              <a
                href="https://www.instagram.com/36soma.runners/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta__email"
              >
                Instagramu
              </a>
              .
            </>
          ) : (
            <>
              Follow us on{" "}
              <a
                href="https://www.instagram.com/36soma.runners/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta__email"
              >
                Instagram
              </a>
              .
            </>
          )}
        </p>
      </div>
    </article>
  );
}
