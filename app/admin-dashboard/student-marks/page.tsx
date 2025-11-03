"use client"

import { useEffect, useState } from "react"
import { getResults } from "@/lib/local-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Row = {
  studentEmail: string
  quizTitle: string
  score: number
  total: number
  timestamp: number
}

export default function StudentMarksPage() {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    setRows(getResults().sort((a, b) => b.timestamp - a.timestamp))
  }, [])

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Student Marks</h1>
      <Card className="soft-card">
        <CardHeader>
          <CardTitle>All Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2 pr-4">Student</th>
                  <th className="py-2 pr-4">Quiz</th>
                  <th className="py-2 pr-4">Score</th>
                  <th className="py-2 pr-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-2 pr-4">{r.studentEmail}</td>
                    <td className="py-2 pr-4">{r.quizTitle}</td>
                    <td className="py-2 pr-4">
                      {r.score} / {r.total}
                    </td>
                    <td className="py-2 pr-4">{new Date(r.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="py-6 text-muted-foreground" colSpan={4}>
                      No results yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
