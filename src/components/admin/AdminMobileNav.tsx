"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { LanguageSwitch } from "@/components/ui/LanguageSwitch"

type AdminNavItem = {
  href: string
  label: string
  icon: ReactNode
}

type AdminMobileNavProps = {
  items: AdminNavItem[]
  locale: string
}

export function AdminMobileNav({ items, locale }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('admin')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label={t('ariaOpenAdminNav')}>
          <Menu size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('adminNavTitle')}</DialogTitle>
        </DialogHeader>
        <nav className="mt-2 flex flex-col gap-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-4 border-t pt-4 flex justify-start">
          <LanguageSwitch locale={locale} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
