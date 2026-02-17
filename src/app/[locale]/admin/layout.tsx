import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Briefcase, Code, Star, Heart, History, FileText } from "lucide-react";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const t = await getTranslations('admin');

  const navItems = [
    { href: `/${locale}/admin`, icon: <LayoutDashboard size={22} />, label: t('dashboard') },
    { href: `/${locale}/admin/projects`, icon: <Briefcase size={22} />, label: t('projects') },
    { href: `/${locale}/admin/skills`, icon: <Code size={22} />, label: t('skills') },
    { href: `/${locale}/admin/experience`, icon: <History size={22} />, label: t('experience') },
    { href: `/${locale}/admin/testimonials`, icon: <Star size={22} />, label: t('testimonials') },
    { href: `/${locale}/admin/resume`, icon: <FileText size={22} />, label: t('resume') },
    { href: `/${locale}/admin/hobbies`, icon: <Heart size={22} />, label: t('hobbies') },
  ];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-white p-6 hidden md:flex flex-col min-h-screen">
        <h2 className="text-xl font-bold mb-8">{t('portfolioAdmin')}</h2>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-14 text-base">
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="pt-4 border-t mt-4">
          <LanguageSwitch locale={locale} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t('adminLabel')}</p>
            <h1 className="text-lg font-semibold">{t('commandCenter')}</h1>
          </div>
          <AdminMobileNav items={navItems} locale={locale} />
        </div>
        {children}
      </main>
    </div>
  );
}
