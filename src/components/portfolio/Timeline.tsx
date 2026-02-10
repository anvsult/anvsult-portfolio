'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ExperienceCard } from './ExperienceCard';
import { Experience } from '@prisma/client';

interface TimelineProps {
  experiences: Experience[];
  locale: string;
}

export function Timeline({ experiences, locale }: TimelineProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ scaleY }}
        className="absolute left-1/2 top-0 w-[2px] h-full bg-primary origin-top hidden md:block"
      />
      <div className="relative flex flex-col items-stretch md:items-center">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} experience={exp} locale={locale} index={index} />
        ))}
      </div>
    </div>
  );
}
