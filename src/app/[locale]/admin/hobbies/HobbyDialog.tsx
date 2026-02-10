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
import { HobbyForm, type HobbyFormInitial } from "./HobbyForm";

type HobbyDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  initial?: HobbyFormInitial;
  submitLabel?: string;
};

export function HobbyDialog({
  trigger,
  title,
  description,
  initial,
  submitLabel,
}: HobbyDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <HobbyForm
          initial={initial}
          submitLabel={submitLabel}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
