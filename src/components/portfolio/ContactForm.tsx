'use client'

import { useState } from "react";
import { sendMessage } from "@/app/[locale]/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const t = useTranslations('contact');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsPending(true);
    try {
      // Add a minimum delay to show the loading state clearly
      const [result] = await Promise.all([
        sendMessage(formData),
        new Promise(resolve => setTimeout(resolve, 500))
      ]);

      if (result?.success) {
        toast.success(t('messageSent'), { description: t('messageSentDesc') });
        (document.getElementById("contact-form") as HTMLFormElement).reset();
      } else {
        toast.error(t('error'), { description: result?.error || "Something went wrong" });
      }
    } catch (error) {
      toast.error(t('error'), { description: "An unexpected error occurred" });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field for bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            name="name"
            placeholder={t('yourName')}
            required
            disabled={isPending}
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder={t('yourEmail')}
            required
            disabled={isPending}
            className="bg-background/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Input
          name="subject"
          placeholder={t('subject')}
          required
          disabled={isPending}
          className="bg-background/50"
        />
      </div>

      <div className="space-y-2">
        <Textarea
          name="content"
          placeholder={t('howCanIHelp')}
          rows={5}
          required
          disabled={isPending}
          className="bg-background/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full transition-all"
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {t('sending')}
          </div>
        ) : (
          t('sendMessage')
        )}
      </Button>
    </form>
  );
}
