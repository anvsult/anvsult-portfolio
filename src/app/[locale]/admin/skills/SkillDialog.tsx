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
import { SkillQuickAdd } from "./SkillQuickAdd"

type SkillDialogProps = {
  trigger: ReactNode
  title: string
  description: string
}

export function SkillDialog({ trigger, title, description }: SkillDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <SkillQuickAdd onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
