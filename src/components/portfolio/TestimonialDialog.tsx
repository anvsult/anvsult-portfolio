'use client'

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TestimonialForm } from "./TestimonialForm";
import { useTranslations } from "next-intl";

type TestimonialDialogProps = {};

export function TestimonialDialog({}: TestimonialDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Index');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{t('testimonialButtonLabel')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('testimonialTitle')}</DialogTitle>
        </DialogHeader>
        <TestimonialForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
