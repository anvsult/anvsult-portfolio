"use client";

import { usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

interface GlobalLanguageSwitchProps {
  locale: string;
}

export function GlobalLanguageSwitch({ locale }: GlobalLanguageSwitchProps) {
  const pathname = usePathname();

  // Check if we are in the admin section
  // pathnames from next-intl already handle the locale prefix if using the hook related to navigation,
  // but usePathname from navigation returns the path *without* the locale prefix usually, 
  // or we need to be careful. usePathname from next-intl/navigation returns path WITHOUT locale.
  // Let's verify: if I am at /en/admin, usePathname returns /admin.

  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
      <LanguageSwitch locale={locale} />
    </div>
  );
}
