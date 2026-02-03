'use client'

import { useState } from "react";
import { sendMessage } from "@/app/[locale]/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await sendMessage(formData);
    setIsPending(false);

    if (result.success) {
      toast.success("Message sent!", {description: "I will get back to you soon." });
      (document.getElementById("contact-form") as HTMLFormElement).reset();
    } else {
      toast.error("Error", {description: result.error });
    }
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Your Name" required />
        <Input name="email" type="email" placeholder="Your Email" required />
      </div>
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="content" placeholder="How can I help you?" rows={5} required />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}