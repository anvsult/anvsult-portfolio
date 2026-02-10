import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"

import { AdminActionForm } from "@/components/admin/AdminActionForm"
import { deleteExperience, moveExperienceDown, moveExperienceUp } from "./actions"

type ExperienceActionsProps = {
  id: string
  order: number
  isFirst: boolean
  isLast: boolean
}

export function ExperienceActions({ id, order, isFirst, isLast }: ExperienceActionsProps) {
  const disabledStyles = "pointer-events-none opacity-50"

  return (
    <div className="flex gap-2">
      <AdminActionForm
        action={moveExperienceUp.bind(null, id, order)}
        variant="outline"
        size="icon"
        disabled={isFirst}
        pendingLabel="Moving..."
        ariaLabel="Move up"
        buttonClassName={isFirst ? disabledStyles : undefined}
      >
        <ArrowUp size={16} />
      </AdminActionForm>
      <AdminActionForm
        action={moveExperienceDown.bind(null, id, order)}
        variant="outline"
        size="icon"
        disabled={isLast}
        pendingLabel="Moving..."
        ariaLabel="Move down"
        buttonClassName={isLast ? disabledStyles : undefined}
      >
        <ArrowDown size={16} />
      </AdminActionForm>
      <AdminActionForm
        action={deleteExperience.bind(null, id)}
        variant="destructive"
        size="icon"
        confirmTitle="Delete experience?"
        confirmDescription="This action cannot be undone."
        confirmLabel="Delete"
        pendingLabel="Deleting..."
        ariaLabel="Delete experience"
      >
        <Trash2 size={16} />
      </AdminActionForm>
    </div>
  )
}
