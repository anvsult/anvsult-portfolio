"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  locale: string;
}

export function LanguageSwitch({ locale }: LanguageSwitchProps) {
  const pathname = usePathname();

  // Show the current locale's flag
  const flag = locale === "fr" ? "🇫🇷" : "🇬🇧";
  const nextLocale = locale === "fr" ? "en" : "fr";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "rounded-full w-14 h-14"
      )}
      aria-label="Switch language"
    >
      <span style={{ fontSize: 36 }}>{flag}</span>
    </Link>
  );
}
