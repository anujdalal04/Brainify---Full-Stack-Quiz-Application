"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/settings", label: "Settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <aside className="border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between p-4 md:hidden">
        <span className="font-semibold">Menu</span>
        <Button variant="outline" size="sm" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Open"}
        </Button>
      </div>
      <nav className={cn("hidden md:block p-4 w-60", open && "block")}>
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm",
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li className="mt-2">
            <form action="/" onSubmit={(e) => e.preventDefault()}>
              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() => {
                  // placeholder logout
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("brainify_user")
                    window.location.href = "/"
                  }
                }}
              >
                Logout
              </Button>
            </form>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
