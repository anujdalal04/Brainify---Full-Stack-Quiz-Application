"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handler = (event: ErrorEvent) => setError(event.error || new Error("Unknown error"))
    window.addEventListener("error", handler)
    return () => window.removeEventListener("error", handler)
  }, [])

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        <Button className="mt-3" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
    )
  }
  return <>{children}</>
}
