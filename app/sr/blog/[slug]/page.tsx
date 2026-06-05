import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "../../../components/BlogPostView";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { getBlogPostMetadata } from "../../../lib/blogMetadata";
import { getAllBlogSlugs, getBlogPost } from "../../../lib/blog";

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
  return getBlogPostMetadata(post, "sr");
}

export default async function BlogPostPageSr({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header locale="sr" />
      <main id="main">
        <BlogPostView post={post} locale="sr" />
      </main>
      <Footer locale="sr" />
    </>
  );
}
