"use client"

import { useEffect } from "react"
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

  useEffect(() => {
    const value = searchParams.get(paramKey)
    if (!value) return

    const message = messages[value]
    if (!message) return

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
