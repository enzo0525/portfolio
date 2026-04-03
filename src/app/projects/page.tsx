import type { Metadata } from "next";
import { BackLink } from "@/components/BackLink";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div>
      <BackLink href="/" label="home" />

      <h1 className="text-[18px] font-semibold mb-8">projects</h1>

      <div className="flex flex-col gap-7">
        {projects.map((project) => (
          <div key={project.title}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium">
              {project.title.toLowerCase()}
            </a>
            <p className="text-text-secondary mt-0.5">{project.description}</p>
            <p className="text-text-faint text-[11px] mt-0.5">{project.tech}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
