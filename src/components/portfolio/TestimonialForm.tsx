"use client";

import { useTranslations } from "next-intl";
import { submitTestimonial } from "@/app/[locale]/testimonials/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, TestimonialFormData } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type TestimonialFormProps = {
  onSuccess?: () => void;
};

export function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const t = useTranslations('testimonial');
  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      authorName: "",
      authorRole: "",
      contentEn: "",
      contentFr: "",
    },
  });

  async function onSubmit(data: TestimonialFormData) {
    const formData = new FormData();
    formData.append("authorName", data.authorName);
    formData.append("authorRole", data.authorRole);
    formData.append("contentEn", data.contentEn);
    if (data.contentFr) {
      formData.append("contentFr", data.contentFr);
    }

    const res = await submitTestimonial(formData);

    if (res.success) {
      toast.success(t('submitted'), { description: t('pendingApproval') });
      form.reset();
      onSuccess?.();
    } else {
      toast.error(t('error'), { description: res.error });
      if (res.fieldErrors) {
        Object.keys(res.fieldErrors).forEach((key) => {
          const fieldName = key as keyof TestimonialFormData;
          const messages = res.fieldErrors?.[fieldName];
          if (messages && messages[0]) {
            form.setError(fieldName, {
              message: messages[0],
            });
          }
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('yourName')} {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorRole"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t('yourRole')} {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="contentEn"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder={t('testimonialEn')} {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentFr"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder={t('testimonialFr')} {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t('submitting') : t('submitTestimonial')}
        </Button>
      </form>
    </Form>
  );
}
