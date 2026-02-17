import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProjectActions } from "./ProjectActions";
import { getTranslations, getLocale } from "next-intl/server";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";

export default async function AdminProjectsPage() {
  const locale = await getLocale();
  const t = await getTranslations('admin');
  const projects = await prisma.project.findMany({
    orderBy: { projectStartDate: 'desc' },
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          created: t('projectCreated'),
          updated: t('projectUpdated'),
          deleted: t('projectDeleted'),
        }}
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('projects')}</h1>
          <p className="text-muted-foreground">{t('projectsDesc')}</p>
        </div>
        <Link href={`/${locale}/admin/projects/new`}>
          <Button className="gap-2">
            <PlusCircle size={18} /> {t('addProject')}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p>{t('noProjectsFound')}</p>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{project.titleEn}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.techStack.join(", ")}
                  </p>
                </div>
                <ProjectActions projectId={project.id} projectTitle={project.titleEn} locale={locale} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
