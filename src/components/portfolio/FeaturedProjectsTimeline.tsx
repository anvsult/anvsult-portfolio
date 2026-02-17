"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, easeOut } from "framer-motion";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { ProjectDetailsDialog } from "./ProjectDetailsDialog";

type ProjectTimelineItem = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  projectStartDate?: Date | string | null;
  projectEndDate?: Date | string | null;
  isActive?: boolean | null;
  githubLink?: string | null;
  liveLink?: string | null;
  imageUrl?: string | null;
};

type FeaturedProjectsTimelineProps = {
  projects: ProjectTimelineItem[];
  locale?: string;
  className?: string;
};

const springConfig = { stiffness: 140, damping: 30, restDelta: 0.001 };

function toDate(value?: Date | string | null) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatMonthYear(date: Date, locale?: string) {
  return new Intl.DateTimeFormat(locale ?? "en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatRange(project: ProjectTimelineItem, locale?: string) {
  const start = toDate(project.projectStartDate);
  const end = toDate(project.projectEndDate);

  const startLabel = start ? formatMonthYear(start, locale) : "Unknown";
  let endLabel: string;

  if (end) {
    endLabel = formatMonthYear(end, locale);
  } else if (project.isActive) {
    endLabel = "Present";
  } else {
    endLabel = "Unknown";
  }

  return `${startLabel} - ${endLabel}`;
}

export function FeaturedProjectsTimeline({ projects, locale, className }: FeaturedProjectsTimelineProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollLength, setScrollLength] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectTimelineItem | null>(null);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const aDate = toDate(a.projectStartDate)?.getTime() ?? Number.POSITIVE_INFINITY;
      const bDate = toDate(b.projectStartDate)?.getTime() ?? Number.POSITIVE_INFINITY;
      return aDate - bDate;
    });
  }, [projects]);

  useEffect(() => {
    const measure = () => {
      if (!sectionRef.current || !trackRef.current) {
        return;
      }

      const containerWidth = sectionRef.current.clientWidth;
      const totalWidth = trackRef.current.scrollWidth;
      const total = Math.max(0, totalWidth - containerWidth);
      setScrollLength(total);
      setSectionHeight(total + (window?.innerHeight ?? 800));
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [sortedProjects.length]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -scrollLength]), springConfig);
  const drawProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);
  const enableScroll = !shouldReduceMotion && scrollLength > 0;
  const enableDesktopScroll = enableScroll && isDesktop;

  const renderTrack = (isScrollable: boolean) => (
    <div
      className={cn(
        "relative h-[420px]",
        isScrollable ? "overflow-visible" : "overflow-x-auto scroll-smooth",
      )}
    >
      <div className="absolute left-0 right-0 top-1/2 h-px bg-border/60" />
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px origin-left bg-foreground/80"
        style={{ scaleX: shouldReduceMotion ? 1 : drawProgress }}
      />
      <motion.div
        ref={trackRef}
        className={cn(
          "flex h-full items-center gap-16 px-6",
          isScrollable ? "" : "min-w-max",
        )}
        style={isScrollable ? { x } : undefined}
      >
        {sortedProjects.map((project, index) => {
          const isAbove = index % 2 === 0;
          const motionProps = shouldReduceMotion
            ? { initial: false }
            : {
              initial: { opacity: 0, y: isAbove ? -24 : 24 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.45, ease: easeOut },
              viewport: { once: true, amount: 0.4 },
            };

          return (
            <div
              key={project.id}
              className="relative flex h-full min-w-[400px] max-w-[500px] flex-col items-center"
            >
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/80" />
              <motion.article
                {...motionProps}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "w-full rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm backdrop-blur cursor-pointer hover:border-border/80 transition-colors",
                  isAbove ? "mb-auto -translate-y-6" : "mt-auto translate-y-6",
                )}
              >
                {/* Image Placeholder */}
                <div className="w-full h-56 mb-4 bg-muted/30 rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-xs uppercase tracking-wider opacity-50">Project Image</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatRange(project, locale)}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{project.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={`${project.id}-${tech}`} variant="secondary" className="text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {(project.liveLink || project.githubLink) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.liveLink && (
                      <Button asChild size="sm" className="gap-2">
                        <Link href={project.liveLink} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          Live
                        </Link>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href={project.githubLink} target="_blank" rel="noreferrer">
                          <Github className="h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </motion.article>
            </div>
          );
        })}
      </motion.div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={cn("relative", className)}
      style={enableDesktopScroll ? { minHeight: `${sectionHeight}px` } : undefined}
    >
      <div className="md:hidden">{renderTrack(false)}</div>
      <div
        className={cn(
          "hidden md:flex items-center",
          enableDesktopScroll ? "sticky top-24 h-[70vh]" : "h-auto",
        )}
      >
        {renderTrack(enableDesktopScroll)}
      </div>

      <ProjectDetailsDialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject ? {
          ...selectedProject,
          dateRange: formatRange(selectedProject, locale)
        } : null}
      />
    </section >
  );
}
