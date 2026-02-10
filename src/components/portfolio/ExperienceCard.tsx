"use client";

import { useRef } from "react";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Experience } from '@prisma/client';
import { cn } from '@/lib/utils';
import { MotionInView } from '@/components/motion/MotionInView';
import { useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ExperienceCardProps {
  experience: Experience;
  locale: string;
  index: number;
}

export function ExperienceCard({ experience, locale, index }: ExperienceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isOdd = index % 2 !== 0;
  const company = locale === 'en' ? experience.companyEn : experience.companyFr;
  const position = locale === 'en' ? experience.positionEn : experience.positionFr;
  const description = locale === 'en' ? experience.descriptionEn : experience.descriptionFr;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [isOdd ? 24 : -24, isOdd ? -24 : 24]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "mb-8 w-full md:w-[calc(50%-2rem)]",
        isOdd ? "md:self-end" : "md:self-start"
      )}
    >
      <MotionInView
        initial={{ opacity: 0, x: isOdd ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        style={shouldReduceMotion ? undefined : { y: parallax }}
      >
        <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/5 group">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-bold">{position}</CardTitle>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">
                  {company}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  {new Date(experience.startDate).getFullYear()} -{' '}
                  {experience.endDate ? new Date(experience.endDate).getFullYear() : 'Present'}
                </p>
                <p className="text-xs text-muted-foreground">{experience.location}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
          <div className="absolute inset-0 text-8xl font-extrabold text-white/5 -z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {company}
          </div>
        </Card>
      </MotionInView>
    </div>
  );
}
