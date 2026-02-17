import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"

import { AdminActionForm } from "@/components/admin/AdminActionForm"
import { deleteExperience, moveExperienceDown, moveExperienceUp } from "./actions"

type ExperienceActionsProps = {
  id: string
  order: number
  isFirst: boolean
  isLast: boolean
}

import { useTranslations } from "next-intl"

export function ExperienceActions({ id, order, isFirst, isLast }: ExperienceActionsProps) {
  const disabledStyles = "pointer-events-none opacity-50"
  const t = useTranslations('admin')

  return (
    <div className="flex gap-2">
      <AdminActionForm
        action={moveExperienceUp.bind(null, id, order)}
        variant="outline"
        size="icon"
        disabled={isFirst}
        pendingLabel={t('moving')}
        ariaLabel={t('moveUp')}
        buttonClassName={isFirst ? disabledStyles : undefined}
      >
        <ArrowUp size={16} />
      </AdminActionForm>
      <AdminActionForm
        action={moveExperienceDown.bind(null, id, order)}
        variant="outline"
        size="icon"
        disabled={isLast}
        pendingLabel={t('moving')}
        ariaLabel={t('moveDown')}
        buttonClassName={isLast ? disabledStyles : undefined}
      >
        <ArrowDown size={16} />
      </AdminActionForm>
      <AdminActionForm
        action={deleteExperience.bind(null, id)}
        variant="destructive"
        size="icon"
        confirmTitle={t('deleteExperienceConfirm')}
        confirmDescription={t('deleteConfirmDesc')}
        confirmLabel={t('delete')}
        pendingLabel={t('deleting')}
        ariaLabel={t('deleteExperience')}
      >
        <Trash2 size={16} />
      </AdminActionForm>
    </div>
  )
}
