"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProjectDetailsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    techStack: string[];
    imageUrl?: string | null;
    githubLink?: string | null;
    liveLink?: string | null;
    dateRange: string;
  } | null;
};

export function ProjectDetailsDialog({ isOpen, onClose, project }: ProjectDetailsDialogProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 overflow-hidden flex flex-col">
        <div className="flex-1 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4" />
                <span>{project.dateRange}</span>
              </div>
            </DialogHeader>

            {project.imageUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 border border-border/50">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">About</h4>
                <DialogDescription className="text-base leading-relaxed text-foreground">
                  {project.description}
                </DialogDescription>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {(project.githubLink || project.liveLink) && (
                <div className="flex gap-3 pt-2">
                  {project.liveLink && (
                    <Button asChild className="gap-2">
                      <Link href={project.liveLink} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Visit Live Site
                      </Link>
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button asChild variant="outline" className="gap-2">
                      <Link href={project.githubLink} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                        View Code
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
