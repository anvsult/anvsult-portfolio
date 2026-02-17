"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

type SearchParamsToastProps = {
  messages: Record<string, string>
  paramKey?: string
}

export function SearchParamsToast({
  messages,
  paramKey = "toast",
}: SearchParamsToastProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const toastShownRef = useRef<string | null>(null)

  useEffect(() => {
    const value = searchParams.get(paramKey)
    if (!value) return

    // Prevent double toast for the same value if we just showed it
    if (toastShownRef.current === value) return

    const message = messages[value]
    if (!message) return

    toastShownRef.current = value
    toast.success(message)

    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete(paramKey)
    const nextUrl = nextParams.toString()
      ? `${pathname}?${nextParams.toString()}`
      : pathname

    router.replace(nextUrl)
  }, [messages, paramKey, pathname, router, searchParams])

  return null
}
