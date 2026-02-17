'use client'

import { submitTestimonial } from "@/app/[locale]/testimonials/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslations } from "next-intl";

type TestimonialFormProps = {
  onSuccess?: () => void;
};

export function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations('testimonial');

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = await submitTestimonial(formData);
    setLoading(false);

    if (res.success) {
      toast.success(t('submitted'), { description: t('pendingApproval') });
      (document.getElementById("testimonial-form") as HTMLFormElement).reset();
      onSuccess?.();
    } else {
      toast.error(t('error'), { description: res.error });
    }
  }

  return (
    <form id="testimonial-form" action={handleAction} className="space-y-4 pt-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input name="authorName" placeholder={t('yourName')} required />
        <Input name="authorRole" placeholder={t('yourRole')} required />
      </div>
      <Textarea name="contentEn" placeholder={t('testimonialEn')} required />
      <Textarea name="contentFr" placeholder={t('testimonialFr')} />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('submitting') : t('submitTestimonial')}
      </Button>
    </form>
  );
}
