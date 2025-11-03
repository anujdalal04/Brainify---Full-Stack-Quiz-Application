"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { StoredUser } from "@/lib/local-store"
import { getUser, clearUser } from "@/lib/local-store"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<StoredUser | null>(null)

  useEffect(() => {
    setUser(getUser())
    const onStorage = (e: StorageEvent) => {
      if (e.key === "brainify_user") setUser(getUser())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-lg text-pretty" aria-label="Brainify home">
          <span className="gradient-text">Brainify 🧠</span>
        </Link>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-xs text-muted-foreground">Logged in as {user.email}</span>
              <Button
                variant="ghost"
                onClick={() => {
                  clearUser()
                  setUser(null)
                  router.push("/")
                }}
              >
                Logout
              </Button>
              <ThemeToggle />
            </>
          ) : (
            <>
              <Link href="/login" className={cn("text-sm hover:underline")}>
                Login
              </Link>
              <Link href="/register">
                <Button className="btn-gradient btn-glow transition-all rounded-full px-5">Get Started</Button>
              </Link>
              <ThemeToggle />
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="rounded-md border border-border px-3 py-2 text-sm"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground mb-1">Logged in as {user.email}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    clearUser()
                    setUser(null)
                    setOpen(false)
                    router.push("/")
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-sm">
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="text-sm">
                  <Button size="sm" className="btn-gradient btn-glow w-full rounded-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
