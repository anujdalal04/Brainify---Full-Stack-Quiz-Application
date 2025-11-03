"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Suspense, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { initializeSampleQuizzes } from "@/lib/seed-quizzes"

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // initialize sample quizzes on first load
  useEffect(() => {
    initializeSampleQuizzes()
  }, [])

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
        </Suspense>
        <Analytics />
      </ThemeProvider>
    </>
  )
}
