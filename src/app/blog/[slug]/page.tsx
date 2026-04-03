import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { BackLink } from "@/components/BackLink";
import { getBlogPosts, getBlogPost } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.frontmatter.title };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div>
      <BackLink href="/blog" label="blog" />

      <h1 className="text-[18px] font-semibold">{post.frontmatter.title}</h1>
      <p className="text-text-faint mt-1 mb-8">{post.frontmatter.date}</p>

      <article className="prose-mono">
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
}
