import { prisma } from "@/lib/db";
import { updateProject } from "../../actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { notFound } from "next/navigation";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>

      <form action={updateProject.bind(null, project.id)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle>English Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleEn">Project Title (EN)</Label>
                <Input id="titleEn" name="titleEn" defaultValue={project.titleEn} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (EN)</Label>
                <Textarea id="descriptionEn" name="descriptionEn" rows={5} defaultValue={project.descriptionEn ?? ""} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>French Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleFr">Titre du Projet (FR)</Label>
                <Input id="titleFr" name="titleFr" defaultValue={project.titleFr} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">Description (FR)</Label>
                <Textarea id="descriptionFr" name="descriptionFr" rows={5} defaultValue={project.descriptionFr ?? ""} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader><CardTitle>Tech & Links</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
              <Input id="techStack" name="techStack" defaultValue={project.techStack.join(", ")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub URL</Label>
              <Input id="githubLink" name="githubLink" type="url" defaultValue={project.githubLink ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveLink">Live Site URL</Label>
              <Input id="liveLink" name="liveLink" type="url" defaultValue={project.liveLink ?? ""} />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Checkbox id="isFeatured" name="isFeatured" defaultChecked={project.isFeatured} />
              <Label htmlFor="isFeatured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                Feature this project on homepage
              </Label>
            </div>
            <p className="text-sm text-muted-foreground mt-2 ml-7">
              Featured projects will be prominently displayed on the main portfolio page
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end gap-4">
          <SubmitButton type="submit" pendingLabel="Saving...">Save Changes</SubmitButton>
        </div>
      </form>
    </div>
  );
}
