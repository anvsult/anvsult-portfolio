"use client";

import { useEffect, useState, useRef } from "react";
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
  const isManualScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>(null);

  /* 
   * Removed automatic scroll tracking as per user request.
   * The bottom nav will now only update when clicked.
   */
  useEffect(() => {
    if (window.location.hash) {
      setActiveId(window.location.hash.replace("#", ""));
    }
  }, []);

  const handleNavClick = (id: string) => {
    isManualScrolling.current = true;
    setActiveId(id);

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set a timeout to re-enable the observer after scrolling is likely finished
    // 1000ms is usually enough for smooth scrolling to complete
    scrollTimeout.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]"
      aria-label={locale === "en" ? "Section navigation" : "Navigation des sections"}
    >
      <div className="max-w-full overflow-x-auto rounded-full shadow-xl shadow-black/10">
        <div className="flex items-center gap-2 md:gap-4 rounded-full border border-border bg-background/85 px-2 py-2 md:px-6 md:py-4 backdrop-blur overflow-hidden isolate">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className="relative flex items-center justify-center rounded-full p-2 md:p-4 text-sm font-medium text-muted-foreground transition hover:bg-accent/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 rounded-full bg-accent/80"
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  />
                )}
                <Icon className="relative size-4 md:size-7" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
