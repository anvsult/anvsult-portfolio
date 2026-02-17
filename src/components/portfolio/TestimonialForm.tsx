'use client'

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type TestimonialFormProps = {
  onSuccess?: () => void;
};

export function TestimonialForm({ onSuccess }: TestimonialFormProps) {
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
      toast.success("Submitted!", { description: "Your testimonial is pending approval." });
      form.reset();
      onSuccess?.();
    } else {
      toast.error("Error", { description: res.error });
      if (res.fieldErrors) {
        Object.keys(res.fieldErrors).forEach((key) => {
          form.setError(key as keyof TestimonialFormData, {
            message: res.fieldErrors[key][0],
          });
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
                  <Input placeholder="Your Name" {...field} />
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
                  <Input placeholder="Role (e.g. Professor)" {...field} />
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
                <Textarea placeholder="Your testimonial in English..." {...field} />
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
                <Textarea placeholder="Votre témoignage en français (optionnel)" {...field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Testimonial"}
        </Button>
      </form>
    </Form>
  );
}
