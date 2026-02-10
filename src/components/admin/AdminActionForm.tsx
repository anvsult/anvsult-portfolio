import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SubmitButton } from "@/components/admin/SubmitButton"

type AdminActionFormProps = {
  action: (formData: FormData) => void | Promise<void>
  children: ReactNode
  variant?: ComponentProps<typeof Button>["variant"]
  size?: ComponentProps<typeof Button>["size"]
  className?: string
  buttonClassName?: string
  disabled?: boolean
  pendingLabel?: string
  confirmTitle?: string
  confirmDescription?: string
  confirmLabel?: string
  cancelLabel?: string
  ariaLabel?: string
}

export function AdminActionForm({
  action,
  children,
  variant,
  size,
  className,
  buttonClassName,
  disabled,
  pendingLabel,
  confirmTitle,
  confirmDescription,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  ariaLabel,
}: AdminActionFormProps) {
  if (confirmTitle) {
    const confirmVariant = variant === "destructive" ? "destructive" : "default"
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={variant} size={size} className={buttonClassName} aria-label={ariaLabel} disabled={disabled}>
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmTitle}</DialogTitle>
            {confirmDescription && (
              <DialogDescription>{confirmDescription}</DialogDescription>
            )}
          </DialogHeader>
          <form action={action} className={className}>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{cancelLabel}</Button>
              </DialogClose>
              <SubmitButton variant={confirmVariant} pendingLabel={pendingLabel}>
                {confirmLabel}
              </SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <form action={action} className={className}>
      <SubmitButton
        variant={variant}
        size={size}
        className={buttonClassName}
        pendingLabel={pendingLabel}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </SubmitButton>
    </form>
  )
}
