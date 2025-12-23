import { Project } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink as ExternalLinkComponent } from "@/components/ui/ExternalLink";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full flex flex-col">
      <div className="relative h-48 bg-background-tertiary rounded-lg overflow-hidden mb-4">
        {/* Placeholder for project image */}
        <div className="absolute inset-0 flex items-center justify-center text-foreground-muted">
          <Image src={project.image} alt={project.imageAlt} height={400} width={400} className="scale-115" />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent-primary transition-colors">{project.title}</h3>
          <p className="text-foreground-secondary mt-2">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="primary" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4 pt-4 border-t border-border">
        {project.liveUrl && (
          <ExternalLinkComponent href={project.liveUrl} icon={ExternalLink}>
            Live Demo
          </ExternalLinkComponent>
        )}
        {project.githubUrl && (
          <ExternalLinkComponent href={project.githubUrl} icon={Github}>
            Code
          </ExternalLinkComponent>
        )}
      </div>
    </Card>
  );
}
