import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProjectActions } from "./ProjectActions";
import { getLocale } from "next-intl/server";
import { SearchParamsToast } from "@/components/admin/SearchParamsToast";

export default async function AdminProjectsPage() {
  const locale = await getLocale();
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <SearchParamsToast
        messages={{
          created: "Project created",
          updated: "Project updated",
          deleted: "Project deleted",
        }}
      />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio items.</p>
        </div>
        <Link href={`/${locale}/admin/projects/new`}>
          <Button className="gap-2">
            <PlusCircle size={18} /> Add Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {projects.length === 0 ? (
          <Card className="p-12 text-center border-dashed sm:col-span-2 lg:col-span-3">
            <p>No projects found. Add your first one to get started!</p>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="max-w-md w-full flex items-center justify-between gap-4 px-4 py-3">
              <div className="min-w-0 text-left">
                <CardTitle className="text-base font-semibold truncate">{project.titleEn}</CardTitle>
                <CardDescription className="text-xs line-clamp-1">
                  {project.techStack.join(", ")}
                </CardDescription>
              </div>
              <div className="shrink-0">
                <ProjectActions projectId={project.id} projectTitle={project.titleEn} locale={locale} />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
