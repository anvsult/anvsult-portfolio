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
import { useTranslations } from "next-intl";

export default function NewProjectPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const t = useTranslations('admin');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('addNewProject')}</h1>

      <form action={createProject}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* English Details */}
          <Card>
            <CardHeader><CardTitle>{t('englishContent')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleEn">{t('projectTitleEn')}</Label>
                <Input id="titleEn" name="titleEn" placeholder="e.g. Book Mind" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">{t('descriptionEn')}</Label>
                <Textarea id="descriptionEn" name="descriptionEn" rows={5} />
              </div>
            </CardContent>
          </Card>

          {/* French Details */}
          <Card>
            <CardHeader><CardTitle>{t('frenchContent')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleFr">{t('projectTitleFr')}</Label>
                <Input id="titleFr" name="titleFr" placeholder="e.g. Book Mind" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionFr">{t('descriptionFr')}</Label>
                <Textarea id="descriptionFr" name="descriptionFr" rows={5} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Upload */}
        <Card className="mt-8">
          <CardHeader><CardTitle>{t('projectImage')}</CardTitle></CardHeader>
          <CardContent>
            <ImageUpload value={imageUrl} onChange={setImageUrl} label={t('coverImage')} />
            <input type="hidden" name="imageUrl" value={imageUrl} />
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader><CardTitle>{t('projectTimeline')}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectStartDate">{t('startDate')}</Label>
              <Input id="projectStartDate" name="projectStartDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectEndDate">{t('endDate')}</Label>
              <Input id="projectEndDate" name="projectEndDate" type="date" />
            </div>
          </CardContent>
        </Card>

        {/* Global Metadata */}
        <Card className="mt-8">
          <CardHeader><CardTitle>{t('techAndLinks')}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="techStack">{t('techStackLabel')}</Label>
              <Input id="techStack" name="techStack" placeholder="Next.js, Tailwind, Prisma" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubLink">{t('githubUrl')}</Label>
              <Input id="githubLink" name="githubLink" type="url" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveLink">{t('liveSiteUrl')}</Label>
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
          <SubmitButton type="submit" pendingLabel={t('saving')}>{t('saveProject')}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
