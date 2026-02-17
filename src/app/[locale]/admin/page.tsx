import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Star, Code, ArrowUpRight } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function AdminDashboard() {
  // Fetch counts for a quick overview
  const locale = await getLocale();
  const [
    projectCount,
    skillCount,
    testimonialCount,
    recentProjects,
    pendingTestimonials,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.testimonial.count({ where: { isApproved: false } }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, titleEn: true, techStack: true },
    }),
    prisma.testimonial.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, authorName: true, contentEn: true },
    }),
  ]);

  const stats = [
    { label: "Projects", value: projectCount, icon: <Briefcase className="text-blue-500" /> },
    { label: "Skills", value: skillCount, icon: <Code className="text-purple-500" /> },
    { label: "Pending Testimonials", value: testimonialCount, icon: <Star className="text-yellow-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Command Center</h1>
        <p className="text-muted-foreground">Real-time overview of content, approvals.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="md:col-span-2 lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}

        <Card className="md:col-span-2 lg:col-span-6">
          <CardHeader className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>Pending Testimonials</CardTitle>
              <p className="text-sm text-muted-foreground">Awaiting approval.</p>
            </div>
            <Link href={`/${locale}/admin/testimonials`}>
              <Button variant="outline" size="sm" className="gap-1">
                Review <ArrowUpRight size={14} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTestimonials.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                Nothing pending right now.
              </div>
            ) : (
              pendingTestimonials.map((t) => (
                <div key={t.id} className="rounded-lg border p-3">
                  <p className="text-sm font-semibold">{t.authorName}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.contentEn}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-6">
          <CardHeader className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <p className="text-sm text-muted-foreground">Latest additions and edits.</p>
            </div>
            <Link href={`/${locale}/admin/projects`}>
              <Button variant="outline" size="sm" className="gap-1">
                Manage <ArrowUpRight size={14} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProjects.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                No projects yet. Add your first project.
              </div>
            ) : (
              recentProjects.map((project) => (
                <div key={project.id} className="rounded-lg border p-3">
                  <p className="text-sm font-semibold">{project.titleEn}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.techStack.slice(0, 3).join(", ")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-4 lg:col-span-12">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Jump straight into content updates.</p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Link href={`/${locale}/admin/projects/new`}>
              <Button className="w-full justify-between">
                Create Project <ArrowUpRight size={14} />
              </Button>
            </Link>
            <Link href={`/${locale}/admin/skills`}>
              <Button variant="outline" className="w-full justify-between">
                Add Skills <ArrowUpRight size={14} />
              </Button>
            </Link>
            <Link href={`/${locale}/admin/experience`}>
              <Button variant="outline" className="w-full justify-between">
                Update Experience <ArrowUpRight size={14} />
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}