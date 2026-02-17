'use client'

import { addExperience } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";

type ExperienceFormProps = {
  onSuccess?: () => void
}

export function ExperienceForm({ onSuccess }: ExperienceFormProps) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('admin');

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = await addExperience(formData);
    setLoading(false);

    if (res.success) {
      toast.success(t('experienceAdded'));
      (document.getElementById("experience-form") as HTMLFormElement).reset();
      onSuccess?.();
    } else {
      toast.error(t('error'), { description: res.error });
    }
  }

  return (
    <form id="experience-form" action={handleAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input name="companyEn" placeholder={t('companyEn')} required />
        <Input name="companyFr" placeholder={t('companyFr')} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input name="positionEn" placeholder={t('positionEn')} required />
        <Input name="positionFr" placeholder={t('positionFr')} required />
      </div>
      <Input name="location" placeholder={t('location')} />
      <div className="grid grid-cols-2 gap-4">
        <Input name="startDate" type="date" required />
        <Input name="endDate" type="date" />
      </div>
      <Input name="technologies" placeholder={t('technologies')} />
      <Textarea name="descriptionEn" placeholder={t('descriptionEn')} />
      <Textarea name="descriptionFr" placeholder={t('descriptionFr')} />
      <Button type="submit" disabled={loading}>
        {loading ? t('adding') : t('addExperience')}
      </Button>
    </form>
  );
}
