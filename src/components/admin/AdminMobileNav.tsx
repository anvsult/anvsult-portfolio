"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type AdminNavItem = {
  href: string
  label: string
  icon: ReactNode
}

type AdminMobileNavProps = {
  items: AdminNavItem[]
}

export function AdminMobileNav({ items }: AdminMobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open admin navigation">
          <Menu size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Navigation</DialogTitle>
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
      </DialogContent>
    </Dialog>
  )
}
