'use client'

import { submitTestimonial } from "@/app/[locale]/testimonials/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

type TestimonialFormProps = {
  onSuccess?: () => void;
};

export function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);
    const res = await submitTestimonial(formData);
    setLoading(false);

    if (res.success) {
      toast.success("Submitted!", { description: "Your testimonial is pending approval." });
      (document.getElementById("testimonial-form") as HTMLFormElement).reset();
      onSuccess?.();
    } else {
      toast.error("Error", { description: res.error });
    }
  }

  return (
    <form id="testimonial-form" action={handleAction} className="space-y-4 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <Input name="authorName" placeholder="Your Name" required />
        <Input name="authorRole" placeholder="Role (e.g. Professor)" required />
      </div>
      <Textarea name="contentEn" placeholder="Your testimonial in English..." required />
      <Textarea name="contentFr" placeholder="Votre témoignage en français (optionnel)" />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Testimonial"}
      </Button>
    </form>
  );
}