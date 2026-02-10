"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExperienceForm } from "./ExperienceForm"

type ExperienceDialogProps = {
  trigger: ReactNode
  title: string
  description: string
}

export function ExperienceDialog({ trigger, title, description }: ExperienceDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ExperienceForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
