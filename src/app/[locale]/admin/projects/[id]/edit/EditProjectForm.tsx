'use client';

import { updateProject } from "../../actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  techStack: string[];
  imageUrl: string | null;
  githubLink: string | null;
  liveLink: string | null;
  isFeatured: boolean;
  projectStartDate: Date;
  projectEndDate: Date | null;
};

export function EditProjectForm({ project }: { project: Project }) {
  const [imageUrl, setImageUrl] = useState(project.imageUrl || "");
  const router = useRouter();

  return (
    <form action={updateProject.bind(null, project.id)}>
      <input type="hidden" name="imageUrl" value={imageUrl} />

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

      {/* Image Upload */}
      <Card className="mt-8">
        <CardHeader><CardTitle>Project Image</CardTitle></CardHeader>
        <CardContent>
          <ImageUpload value={imageUrl} onChange={setImageUrl} label="Cover Image" />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader><CardTitle>Project Timeline</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectStartDate">Start Date</Label>
            <Input
              id="projectStartDate"
              name="projectStartDate"
              type="date"
              defaultValue={project.projectStartDate ? new Date(project.projectStartDate).toISOString().split('T')[0] : ''}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectEndDate">End Date (Leave empty if Ongoing)</Label>
            <Input
              id="projectEndDate"
              name="projectEndDate"
              type="date"
              defaultValue={project.projectEndDate ? new Date(project.projectEndDate).toISOString().split('T')[0] : ''}
            />
          </div>
        </CardContent>
      </Card>

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
        <CardContent>
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
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <SubmitButton type="submit" pendingLabel="Saving...">Save Changes</SubmitButton>
      </div>
    </form >
  );
}
