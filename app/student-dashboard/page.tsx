"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiCall } from "@/lib/api-client"

type Section = "quizzes" | "results"

interface Quiz {
  _id: string
  title: string
  description: string
  questionCount: number
}

interface Result {
  _id: string
  quizTitle: string
  score: number
  total: number
  percentage: string
  timestamp: string
}

export default function StudentDashboard() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [section, setSection] = useState<Section>("quizzes")
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("brainify_user") || "{}")
    if (!user.email || user.role !== "student") {
      router.replace("/login")
      return
    }
    setEmail(user.email)
    fetchQuizzes()
    fetchResults(user.email)
  }, [router])

  const fetchQuizzes = async () => {
    const { data } = await apiCall<{ quizzes: Quiz[] }>("/api/quiz/get-all", {
      method: "GET",
    })

    if (data) {
      setQuizzes(data.quizzes)
    }
    setLoading(false)
  }

  const fetchResults = async (studentEmail: string) => {
    const { data } = await apiCall<{ results: Result[] }>("/api/result/get-by-student", {
      method: "POST",
      body: JSON.stringify({ studentEmail }),
    })

    if (data) {
      setResults(data.results)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("brainify_user")
    localStorage.removeItem("brainify_token")
    router.push("/")
  }

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r border-border">
        <nav className="p-4 flex flex-col gap-2">
          <button
            className={`text-left rounded-md px-3 py-2 text-sm hover:bg-muted ${section === "quizzes" ? "bg-muted" : ""}`}
            onClick={() => setSection("quizzes")}
          >
            Available Quizzes
          </button>
          <button
            className={`text-left rounded-md px-3 py-2 text-sm hover:bg-muted ${section === "results" ? "bg-muted" : ""}`}
            onClick={() => setSection("results")}
          >
            My Results
          </button>
          <Button variant="ghost" className="mt-2 justify-start" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </aside>

      <main className="p-4">
        {section === "quizzes" && (
          <section className="grid gap-3">
            <h1 className="text-xl font-semibold">Available Quizzes</h1>
            <div className="grid gap-4 sm:grid-cols-2">
              {quizzes.map((q) => (
                <Card key={q._id} className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-pretty">{q.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <p className="text-sm text-muted-foreground">{q.description}</p>
                    <p className="text-xs text-muted-foreground">{q.questionCount} questions</p>
                    <Link href={`/quiz/${q._id}`} className="mt-1">
                      <Button className="btn-gradient btn-glow rounded-full px-5">Start Quiz</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
              {quizzes.length === 0 && <p className="text-sm text-muted-foreground">No quizzes available yet.</p>}
            </div>
          </section>
        )}

        {section === "results" && (
          <section className="grid gap-3">
            <h1 className="text-xl font-semibold">My Results</h1>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4 pl-3">Quiz</th>
                    <th className="py-2 pr-4">Score</th>
                    <th className="py-2 pr-4">Percentage</th>
                    <th className="py-2 pr-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r._id} className="border-t border-border">
                      <td className="py-2 pr-4 pl-3">{r.quizTitle}</td>
                      <td className="py-2 pr-4">
                        {r.score} / {r.total}
                      </td>
                      <td className="py-2 pr-4">{r.percentage}%</td>
                      <td className="py-2 pr-4">{new Date(r.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                  {results.length === 0 && (
                    <tr>
                      <td className="py-6 text-muted-foreground text-center" colSpan={4}>
                        No attempts yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
