"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

const items = [
  { href: "/admin-dashboard", label: "Home" },
  { href: "/admin-dashboard/create-quiz", label: "Create Quiz" },
  { href: "/admin-dashboard/student-marks", label: "Student Marks" },
]

export function AdminSidebar({ currentPath }: { currentPath?: string | null }) {
  return (
    <nav className="p-3">
      <ul className="grid gap-1">
        {items.map((it) => {
          const active = currentPath === it.href
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn("block rounded-md px-3 py-2 text-sm hover:bg-muted", active && "bg-muted font-medium")}
              >
                {it.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
