import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  // Static placeholders for now
  const stats = [
    { label: "Total quizzes taken", value: 12 },
    { label: "Average score", value: "78%" },
    { label: "Last quiz date", value: "2025-10-10" },
  ]
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-pretty">
        <span className="gradient-text mr-2">Brainify 🧠</span>
        Welcome back
      </h1>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="soft-card">
            <CardHeader>
              <CardTitle className="text-base">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{s.value}</CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Link href="/quizzes">
          <Button className="btn-gradient rounded-full px-5">Take New Quiz</Button>
        </Link>
      </div>
    </div>
  )
}
