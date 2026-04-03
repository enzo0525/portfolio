import Link from "next/link";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { getBlogPosts } from "@/lib/blog";

export default function Home() {
  const recentProjects = projects.slice(0, 3);
  const recentPosts = getBlogPosts().slice(0, 3);

  const recentItems = [
    ...recentProjects.map((p) => ({
      label: `${p.title.toLowerCase()} — ${p.description}`,
      href: p.url,
      date: new Date(`${p.year}-01-01`),
    })),
    ...recentPosts.map((p) => ({
      label: `${p.title} — blog post`,
      href: `/blog/${p.slug}`,
      date: new Date(p.date),
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-[20px] font-semibold">hi, i&apos;m {personal.name}</h1>
      <p className="text-text-muted mt-1">{personal.title.toLowerCase()}</p>

      <p className="text-text-secondary mt-8 max-w-[420px]">i love building stuff</p>
      <p className="text-text-secondary mt-8 max-w-[420px]">
        i try my best to turn my problems into projects and whenever i can, i share them on my{" "}
        <a className="text-text-secondary hover:text-text" href={personal.social.twitter} target="_blank" rel="noopener noreferrer">
          twitter
        </a>
      </p>

      <nav className="mt-10 flex flex-col gap-1 leading-relaxed">
        <Link href="/blog">→ blog</Link>
        <Link href="/projects">→ projects</Link>
        <Link href="/other">→ other</Link>
      </nav>

      {recentItems.length > 0 && (
        <div className="mt-10">
          <p className="text-text-faint mb-2">recent:</p>
          <div className="flex flex-col gap-1">
            {recentItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("/") ? undefined : "_blank"}
                rel={item.href.startsWith("/") ? undefined : "noopener noreferrer"}
                className="text-text-secondary hover:text-text">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
