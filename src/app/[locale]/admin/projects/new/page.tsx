'use client'

import { createProject } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>

      <form action={createProject}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* English Details */}
          <Card>
            <CardHeader><CardTitle>English Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleEn">Project Title (EN)</Label>
                <Input id="titleEn" name="titleEn" placeholder="e.g. Book Mind" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (EN)</Label>
                <Textarea id="descriptionEn" name="descriptionEn" rows={5} />
              </div>
            </CardContent>
          </Card>

          {/* French Details */}
          <Card>
            <CardHeader><CardTitle>French Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleFr">Titre du Projet (FR)</Label>
                <Input id="titleFr" name="titleFr" placeholder="e.g. Book Mind" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">Description (FR)</Label>
                <Textarea id="descriptionFr" name="descriptionFr" rows={5} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Upload */}
        <Card className="mt-8">
          <CardHeader><CardTitle>Project Image</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload value={imageUrl} onChange={setImageUrl} label="Cover Image" />
            <input type="hidden" name="imageUrl" value={imageUrl} />
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader><CardTitle>Project Timeline</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectStartDate">Start Date</Label>
              <Input id="projectStartDate" name="projectStartDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectEndDate">End Date (Leave empty if Ongoing)</Label>
              <Input id="projectEndDate" name="projectEndDate" type="date" />
            </div>
          </CardContent>
        </Card>

        {/* Global Metadata */}
        <Card className="mt-8">
          <CardHeader><CardTitle>Tech & Links</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
              <Input id="techStack" name="techStack" placeholder="Next.js, Tailwind, Prisma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub URL</Label>
              <Input id="githubLink" name="githubLink" type="url" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveLink">Live Site URL</Label>
              <Input id="liveLink" name="liveLink" type="url" />
            </div>
          </CardContent>
        </Card>

        {/* Featured Checkbox */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Checkbox id="isFeatured" name="isFeatured" />
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
          <SubmitButton type="submit" pendingLabel="Saving...">Save Project</SubmitButton>
        </div>
      </form>
    </div>
  );
}
