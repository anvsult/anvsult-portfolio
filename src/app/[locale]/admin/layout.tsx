import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Briefcase, Code, MessageSquare, Star } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/admin/projects", icon: <Briefcase size={18} />, label: "Projects" },
    { href: "/admin/skills", icon: <Code size={18} />, label: "Skills" },
    { href: "/admin/testimonials", icon: <Star size={18} />, label: "Testimonials" },
    { href: "/admin/messages", icon: <MessageSquare size={18} />, label: "Messages" },
  ];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
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
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}