import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div>
      <BackLink href="/" label="home" />

      <h1 className="text-[18px] font-semibold mb-8">blog</h1>

      {posts.length === 0 ? (
        <p className="text-text-muted">nothing here yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <div key={post.slug} className="flex justify-between gap-4">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <span className="text-text-faint shrink-0">{post.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
