"use client"

import Link from "next/link"
import { getQuizzes } from "@/lib/local-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function AdminHomePage() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(getQuizzes().length)
  }, [])

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">
        <span className="gradient-text mr-2">Brainify 🧠</span>
        Admin Dashboard
      </h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="soft-card">
          <CardHeader>
            <CardTitle className="text-base">Quizzes Created</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{count}</CardContent>
        </Card>
      </div>
      <div className="flex gap-3">
        <Link href="/admin-dashboard/create-quiz">
          <Button className="btn-gradient rounded-full px-5">Create Quiz</Button>
        </Link>
        <Link href="/admin-dashboard/student-marks">
          <Button variant="outline" className="rounded-full px-5 bg-transparent">
            View Student Marks
          </Button>
        </Link>
      </div>
    </div>
  )
}
