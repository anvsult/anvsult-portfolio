"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  History,
  Code2,
  Heart,
  Quote,
  FileText,
  Mail
} from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

type BottomNavProps = {
  locale: string;
};

const navItems = (locale: string) => [
  { id: "top", label: locale === "en" ? "Home" : "Accueil", icon: Home },
  { id: "projects", label: locale === "en" ? "Projects" : "Projets", icon: Briefcase },
  { id: "journey", label: locale === "en" ? "Journey" : "Parcours", icon: History },
  { id: "skills", label: locale === "en" ? "Skills" : "Competences", icon: Code2 },
  { id: "hobbies", label: locale === "en" ? "Lifestyle" : "Passions", icon: Heart },
  { id: "testimonials", label: locale === "en" ? "Reviews" : "Avis", icon: Quote },
  { id: "resume", label: locale === "en" ? "Resume" : "CV", icon: FileText },
  { id: "contact", label: locale === "en" ? "Contact" : "Contact", icon: Mail }
];

export function BottomNav({ locale }: BottomNavProps) {
  const items = navItems(locale);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "top");

  useEffect(() => {
    if (window.location.hash) {
      setActiveId(window.location.hash.replace("#", ""));
    }

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }

        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <nav
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]"
      aria-label={locale === "en" ? "Section navigation" : "Navigation des sections"}
    >
      <div className="max-w-full overflow-x-auto rounded-full shadow-xl shadow-black/10">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/85 px-2 py-2 backdrop-blur overflow-hidden isolate">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <Magnetic key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="relative flex items-center justify-center rounded-full p-2 text-sm font-medium text-muted-foreground transition hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="bottom-nav-active"
                      className="absolute inset-0 rounded-full bg-accent/80"
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    />
                  )}
                  <Icon className="relative size-4" aria-hidden="true" />
                </a>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
