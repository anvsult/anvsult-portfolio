"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type TestimonialItem = {
  id: string;
  authorName: string;
  authorRole: string | null;
  contentEn: string;
  contentFr: string;
};

type TestimonialWallProps = {
  testimonials: TestimonialItem[];
  locale: string;
};

const columnSettings = [
  { duration: 28, delay: -17, offset: 0 },
  { duration: 34, delay: -14, offset: 10 },
  { duration: 26, delay: -11, offset: 20 },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export function TestimonialWall({ testimonials, locale }: TestimonialWallProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  if (testimonials.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        {locale === "en" ? "No testimonials yet." : "Aucun temoignage pour le moment."}
      </p>
    );
  }

  const columnCount = isDesktop
    ? testimonials.length >= 12
      ? 3
      : testimonials.length >= 8
        ? 2
        : 1
    : 1;
  const columns: TestimonialItem[][] = Array.from({ length: columnCount }, () => []);

  testimonials.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  return (
    <motion.div
      initial={false}
      animate={shouldReduceMotion ? { opacity: 1 } : undefined}
      className="testimonial-wall"
      data-columns={columnCount}
    >
      {columns.map((items, columnIndex) => {
        const { duration, delay, offset } = columnSettings[columnIndex] ?? columnSettings[0];
        const durationValue = isDesktop ? duration : Math.round(duration * 1.6);
        const delayValue = isDesktop ? delay : Math.round(delay * 1.6);
        const loopItems = [...items, ...items];
        const direction = columnCount === 3 && columnIndex === 1 ? "down" : "up";

        return (
          <div
            key={`column-${columnIndex}`}
            className="testimonial-wall__column"
            data-direction={direction}
            style={
              {
                "--duration": `${durationValue}s`,
                "--delay": `${delayValue}s`,
                "--offset": `${offset}px`,
              } as CSSProperties
            }
          >
            <div className="testimonial-wall__track">
              {loopItems.map((item, index) => (
                <article
                  key={`${item.id}-${index}`}
                  className="testimonial-wall__card"
                >
                  <div className="testimonial-wall__avatar">
                    {getInitials(item.authorName)}
                  </div>
                  <div className="testimonial-wall__body">
                    <h3 className="text-base font-semibold text-foreground">
                      {item.authorName}
                    </h3>
                    {item.authorRole && (
                      <p className="text-xs text-muted-foreground">{item.authorRole}</p>
                    )}
                    <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
                      {locale === "en" ? item.contentEn : item.contentFr}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
