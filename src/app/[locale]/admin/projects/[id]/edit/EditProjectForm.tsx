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
import { useTranslations } from "next-intl";

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
  const t = useTranslations('admin');

  return (
    <form action={updateProject.bind(null, project.id)}>
      <input type="hidden" name="imageUrl" value={imageUrl} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>{t('englishContent')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titleEn">{t('projectTitleEn')}</Label>
              <Input id="titleEn" name="titleEn" defaultValue={project.titleEn} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionEn">{t('descriptionEn')}</Label>
              <Textarea id="descriptionEn" name="descriptionEn" rows={5} defaultValue={project.descriptionEn ?? ""} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('frenchContent')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titleFr">{t('projectTitleFr')}</Label>
              <Input id="titleFr" name="titleFr" defaultValue={project.titleFr} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionFr">{t('descriptionFr')}</Label>
              <Textarea id="descriptionFr" name="descriptionFr" rows={5} defaultValue={project.descriptionFr ?? ""} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Upload */}
      <Card className="mt-8">
        <CardHeader><CardTitle>{t('projectImage')}</CardTitle></CardHeader>
        <CardContent>
          <ImageUpload value={imageUrl} onChange={setImageUrl} label={t('coverImage')} />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader><CardTitle>{t('projectTimeline')}</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectStartDate">{t('startDate')}</Label>
            <Input
              id="projectStartDate"
              name="projectStartDate"
              type="date"
              defaultValue={project.projectStartDate ? new Date(project.projectStartDate).toISOString().split('T')[0] : ''}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectEndDate">{t('endDate')}</Label>
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
        <CardHeader><CardTitle>{t('techAndLinks')}</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="techStack">{t('techStackLabel')}</Label>
            <Input id="techStack" name="techStack" defaultValue={project.techStack.join(", ")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubLink">{t('githubUrl')}</Label>
            <Input id="githubLink" name="githubLink" type="url" defaultValue={project.githubLink ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="liveLink">{t('liveSiteUrl')}</Label>
            <Input id="liveLink" name="liveLink" type="url" defaultValue={project.liveLink ?? ""} />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardContent>
          <div className="flex items-center space-x-3">
            <Checkbox id="isFeatured" name="isFeatured" defaultChecked={project.isFeatured} />
            <Label htmlFor="isFeatured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              {t('featureProject')}
            </Label>
          </div>
          <p className="text-sm text-muted-foreground mt-2 ml-7">
            {t('featureProjectDesc')}
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>{t('cancel')}</Button>
        <SubmitButton type="submit" pendingLabel={t('saving')}>{t('saveChanges')}</SubmitButton>
      </div>
    </form >
  );
}
