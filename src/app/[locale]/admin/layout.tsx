import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Briefcase, Code, MessageSquare, Star, Heart, History } from "lucide-react";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getLocale } from "next-intl/server";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const navItems = [
    { href: `/${locale}/admin`, icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: `/${locale}/admin/projects`, icon: <Briefcase size={18} />, label: "Projects" },
    { href: `/${locale}/admin/skills`, icon: <Code size={18} />, label: "Skills" },
    { href: `/${locale}/admin/experience`, icon: <History size={18} />, label: "Experience" },
    { href: `/${locale}/admin/testimonials`, icon: <Star size={18} />, label: "Testimonials" },
    { href: `/${locale}/admin/messages`, icon: <MessageSquare size={18} />, label: "Messages" },
    { href: `/${locale}/admin/hobbies`, icon: <Heart size={18} />, label: "Hobbies" },
  ];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Portfolio Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin</p>
            <h1 className="text-lg font-semibold">Portfolio Command Center</h1>
          </div>
          <AdminMobileNav items={navItems} />
        </div>
        {children}
      </main>
    </div>
  );
}
