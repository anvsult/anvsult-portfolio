"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { cn } from "@/lib/utils";

type ProjectItem = {
  id: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  techStack: string[];
  githubLink?: string | null;
  liveLink?: string | null;
};

type ProjectGalleryProps = {
  projects: ProjectItem[];
  locale: string;
};

export function ProjectGallery({ projects, locale }: ProjectGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollLength, setScrollLength] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const rowCount = Math.min(3, Math.max(1, projects.length));
  const rows: ProjectItem[][] = Array.from({ length: rowCount }, () => []);

  projects.forEach((project, index) => {
    rows[index % rowCount].push(project);
  });

  useEffect(() => {
    const cardWidth = 360;
    const gap = 24;
    const railPadding = 96;

    const measure = () => {
      if (!sectionRef.current) {
        return;
      }

      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);

      const containerWidth = sectionRef.current.clientWidth;
      const maxRowLength = Math.max(...rows.map((row) => row.length));
      const totalWidth = maxRowLength * (cardWidth + gap) - gap;
      const total = Math.max(0, totalWidth - containerWidth + railPadding);
      setScrollLength(total);
      setSectionHeight(total + (window?.innerHeight ?? 800));
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [projects.length, rowCount]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 120, damping: 30, restDelta: 0.001 };
  const rowTransforms = [
    useSpring(useTransform(scrollYProgress, [0, 1], [0, -scrollLength]), springConfig),
    useSpring(useTransform(scrollYProgress, [0, 1], [0, scrollLength * 0.85]), springConfig),
    useSpring(useTransform(scrollYProgress, [0, 1], [0, -scrollLength * 0.7]), springConfig),
  ];
  const showRail = !shouldReduceMotion && scrollLength > 0 && isDesktop;

  const renderGrid = (className: string) => (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", className)}>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            title={locale === "en" ? project.titleEn : project.titleFr}
            description={locale === "en" ? project.descriptionEn : project.descriptionFr}
            techStack={project.techStack}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
          />
        ))
      ) : (
        <p className="text-muted-foreground col-span-full">
          {locale === "en" ? "No projects added yet." : "Aucun projet ajoute pour le moment."}
        </p>
      )}
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={showRail ? { minHeight: `${sectionHeight}px` } : undefined}
    >
      {renderGrid("md:hidden")}
      {!showRail && renderGrid("hidden md:grid")}

      {showRail && (
        <div className="hidden md:block sticky top-24 h-[78vh]">
          <div className="h-full flex flex-col justify-center gap-6">
            {rows.map((rowProjects, rowIndex) => (
              <motion.div
                key={`project-row-${rowIndex}`}
                style={{ x: rowTransforms[rowIndex] ?? rowTransforms[0] }}
                className="flex gap-6 pr-24 will-change-transform"
              >
                {rowProjects.map((project, index) => (
                  <div key={project.id} className="min-w-[320px] max-w-[360px]">
                    <ProjectCard
                      index={index}
                      title={locale === "en" ? project.titleEn : project.titleFr}
                      description={locale === "en" ? project.descriptionEn : project.descriptionFr}
                      techStack={project.techStack}
                      githubLink={project.githubLink}
                      liveLink={project.liveLink}
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
