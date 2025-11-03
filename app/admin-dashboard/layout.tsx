"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getUser } from "@/lib/local-store"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const user = getUser()
    if (!user) {
      router.replace("/login")
      return
    }
    if (user.role !== "admin") {
      router.replace("/student-dashboard")
    }
  }, [router])

  return (
    <div className="min-h-dvh">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-r border-border">
          <AdminSidebar currentPath={pathname} />
        </aside>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
