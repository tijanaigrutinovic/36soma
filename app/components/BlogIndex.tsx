import Link from "next/link";
import {
  BLOG_TAGS,
  blogPostPath,
  formatBlogDate,
  getBlogPosts,
  type BlogLocale,
} from "../lib/blog";
import { SiteImage } from "./SiteImage";

type BlogIndexProps = {
  locale?: BlogLocale;
};

export function BlogIndex({ locale = "en" }: BlogIndexProps) {
  const isSr = locale === "sr";
  const posts = getBlogPosts(locale);

  return (
    <section className="section section--blog">
      <div className="section__inner">
        <p className="story__eyebrow">{isSr ? "Blog" : "Blog"}</p>
        <h1 className="section__heading section__heading--xl">
          {isSr ? "Iz kluba" : "From the crew"}
        </h1>
        <p className="blog__intro cta__text">
          {isSr ? (
            <>
              Priče, saveti i trenuci koje nosimo sa staze.
            </>
          ) : (
            <>
              Short stories, tips and moments we take from the track.
            </>
          )}
        </p>

        <ul className="blog__grid">
          {posts.map((post) => (
            <li key={post.slug} className="blog__card">
              <article>
                {(post.imageCover ?? post.image) ? (
                  <Link href={blogPostPath(locale, post.slug)} className="blog__card-media">
                    <SiteImage
                      src={post.imageCover ?? post.image!}
                      alt=""
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                ) : null}
                <div className="blog__card-body">
                  <time className="blog__date" dateTime={post.date}>
                    {formatBlogDate(post.date, locale)}
                  </time>
                  <h2 className="blog__card-title">
                    <Link href={blogPostPath(locale, post.slug)}>{post.title[locale]}</Link>
                  </h2>
                  <p className="blog__excerpt">{post.excerpt[locale]}</p>
                  <ul className="blog__tags" aria-label={isSr ? "Oznake" : "Tags"}>
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <span className="blog__tag">{BLOG_TAGS[tag].label[locale]}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={blogPostPath(locale, post.slug)} className="blog__read-more">
                    {isSr ? "Pročitaj →" : "Read more →"}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
