import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title as string,
        date: data.date as string,
        description: (data.description as string) ?? "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): {
  frontmatter: BlogPost;
  content: string;
} | null {
  if (slug.includes("/") || slug.includes("..")) return null;

  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: (data.description as string) ?? "",
    },
    content,
  };
}
