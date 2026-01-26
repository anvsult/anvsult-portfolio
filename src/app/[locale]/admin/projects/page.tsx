import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio items.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="gap-2">
            <PlusCircle size={18} /> Add Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {projects.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p>No projects found. Add your first one to get started!</p>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="flex items-center justify-between p-4">
              <div>
                <CardTitle className="text-lg">{project.titleEn}</CardTitle>
                <CardDescription>{project.techStack.join(", ")}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon"><Pencil size={16} /></Button>
                <Button variant="destructive" size="icon"><Trash2 size={16} /></Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}