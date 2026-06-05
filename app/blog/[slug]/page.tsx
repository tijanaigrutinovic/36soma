import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "../../components/BlogPostView";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { getBlogPostMetadata } from "../../lib/blogMetadata";
import { getAllBlogSlugs, getBlogPost } from "../../lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return getBlogPostMetadata(post, "en");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header locale="en" />
      <main id="main">
        <BlogPostView post={post} locale="en" />
      </main>
      <Footer locale="en" />
    </>
  );
}
