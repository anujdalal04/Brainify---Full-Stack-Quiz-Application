import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[240px_1fr]">
      <Sidebar />
      <main className="min-h-[70dvh] p-4">{children}</main>
    </div>
  )
}
