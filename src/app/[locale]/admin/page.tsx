import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase, Star, Code, ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AdminDashboard() {
  // Fetch counts for a quick overview
  const locale = await getLocale();
  const t = await getTranslations('admin');
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
    { label: t('projects'), value: projectCount, icon: <Briefcase className="text-blue-500" /> },
    { label: t('skills'), value: skillCount, icon: <Code className="text-purple-500" /> },
    { label: t('pendingTestimonials'), value: testimonialCount, icon: <Star className="text-yellow-500" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t('commandCenter')}</h1>
        <p className="text-muted-foreground">{t('overview')}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>{t('pendingTestimonialsTitle')}</CardTitle>
              <p className="text-sm text-muted-foreground">{t('awaitingApproval')}</p>
            </div>
            <Link href={`/${locale}/admin/testimonials`}>
              <Button variant="outline" size="sm" className="gap-1">
                {t('review')} <ArrowUpRight size={14} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {pendingTestimonials.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                {t('nothingPending')}
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

        <Card className="flex flex-col">
          <CardHeader className="flex items-center justify-between gap-2">
            <div>
              <CardTitle>{t('recentProjects')}</CardTitle>
              <p className="text-sm text-muted-foreground">{t('latestAdditions')}</p>
            </div>
            <Link href={`/${locale}/admin/projects`}>
              <Button variant="outline" size="sm" className="gap-1">
                {t('manage')} <ArrowUpRight size={14} />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 flex-1">
            {recentProjects.length === 0 ? (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                {t('noProjects')}
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
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
          <p className="text-sm text-muted-foreground">{t('jumpToContent')}</p>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3">
          <Link href={`/${locale}/admin/projects/new`}>
            <Button className="w-full justify-between h-auto py-4">
              <span className="flex flex-col items-start gap-1">
                <span>{t('createProject')}</span>
                <span className="text-xs font-normal opacity-80">{t('addNewWork')}</span>
              </span>
              <ArrowUpRight size={16} />
            </Button>
          </Link>
          <Link href={`/${locale}/admin/skills`}>
            <Button variant="outline" className="w-full justify-between h-auto py-4">
              <span className="flex flex-col items-start gap-1">
                <span>{t('addSkills')}</span>
                <span className="text-xs font-normal text-muted-foreground">{t('updateStack')}</span>
              </span>
              <ArrowUpRight size={16} />
            </Button>
          </Link>
          <Link href={`/${locale}/admin/experience`}>
            <Button variant="outline" className="w-full justify-between h-auto py-4">
              <span className="flex flex-col items-start gap-1">
                <span>{t('updateExperience')}</span>
                <span className="text-xs font-normal text-muted-foreground">{t('careerJourney')}</span>
              </span>
              <ArrowUpRight size={16} />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}