"use client"

import type { FormEvent } from "react"
import { useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

import { createSkill } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SkillQuickAddProps = {
  onSuccess?: () => void
}

export function SkillQuickAdd({ onSuccess }: SkillQuickAddProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('admin')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      try {
        await createSkill(formData)
        toast.success(t('skillAdded'))
        formRef.current?.reset()
        router.refresh()
        onSuccess?.()
      } catch (error) {
        toast.error(t('skillAddFailed'))
        console.error(error)
      }
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('nameEn')}</label>
        <Input name="nameEn" placeholder="TypeScript" required disabled={isPending} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('nameFr')}</label>
        <Input name="nameFr" placeholder="TypeScript" required disabled={isPending} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">{t('category')}</label>
        <select
          name="category"
          disabled={isPending}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm"
        >
          <option value="Frontend">{t('frontend')}</option>
          <option value="Backend">{t('backend')}</option>
          <option value="Tools">{t('tools')}</option>
        </select>
      </div>
      <Button type="submit" disabled={isPending} aria-busy={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('adding')}
          </>
        ) : (
          t('addSkill')
        )}
      </Button>
    </form>
  )
}
