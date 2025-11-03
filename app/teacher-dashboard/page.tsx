"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiCall } from "@/lib/api-client"

interface Quiz {
  _id: string
  title: string
  description: string
  questionCount: number
  createdBy: string
  isActive: boolean
  createdAt: string
}

interface Analytics {
  totalResponses: number
  averageScore: string
  highestScore: string
  lowestScore: string
}

export default function TeacherDashboard() {
  const router = useRouter()
  const [email, setEmail] = useState<string>("")
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [analytics, setAnalytics] = useState<Record<string, Analytics>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("brainify_user") || "{}")
    if (!user.email || user.role !== "teacher") {
      router.replace("/login")
      return
    }
    setEmail(user.email)
    fetchQuizzes(user.email)
  }, [router])

  const fetchQuizzes = async (teacherEmail: string) => {
    const { data, error } = await apiCall<{ quizzes: Quiz[] }>("/api/quiz/get-by-teacher", {
      method: "POST",
      body: JSON.stringify({ email: teacherEmail }),
    })

    if (!error && data) {
      setQuizzes(data.quizzes)
      // Fetch analytics for each quiz
      data.quizzes.forEach((quiz) => fetchAnalytics(quiz._id))
    }
    setLoading(false)
  }

  const fetchAnalytics = async (quizId: string) => {
    const { data } = await apiCall<{ analytics: Analytics }>("/api/result/get-by-quiz", {
      method: "POST",
      body: JSON.stringify({ quizId }),
    })

    if (data) {
      setAnalytics((prev) => ({ ...prev, [quizId]: data.analytics }))
    }
  }

  const handleToggleQuiz = async (quizId: string, currentStatus: boolean) => {
    await apiCall("/api/quiz/update-status", {
      method: "POST",
      body: JSON.stringify({ quizId, isActive: !currentStatus, email }),
    })
    fetchQuizzes(email)
  }

  const handleDeleteQuiz = async (quizId: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      await apiCall("/api/quiz/delete", {
        method: "POST",
        body: JSON.stringify({ quizId, email }),
      })
      fetchQuizzes(email)
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
          <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">Teacher Dashboard</div>
          <Link href="/teacher-dashboard/create-quiz">
            <Button className="w-full justify-start btn-gradient rounded-full px-5">Create Quiz</Button>
          </Link>
          <Button variant="ghost" className="mt-2 justify-start" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </aside>

      <main className="p-4">
        <section className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">My Quizzes</h1>
            <span className="text-sm text-muted-foreground">{quizzes.length} quiz(zes)</span>
          </div>

          {quizzes.length === 0 ? (
            <Card className="bg-card rounded-xl shadow-sm">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground mb-4">No quizzes created yet.</p>
                <Link href="/teacher-dashboard/create-quiz">
                  <Button className="btn-gradient rounded-full px-5">Create Your First Quiz</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz._id}
                  quiz={quiz}
                  analytics={analytics[quiz._id]}
                  onToggle={handleToggleQuiz}
                  onDelete={handleDeleteQuiz}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function QuizCard({
  quiz,
  analytics,
  onToggle,
  onDelete,
}: {
  quiz: Quiz
  analytics?: Analytics
  onToggle: (id: string, status: boolean) => void
  onDelete: (id: string) => void
}) {
  return (
    <Card className="bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-pretty">{quiz.title}</CardTitle>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              quiz.isActive
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
            }`}
          >
            {quiz.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="text-sm text-muted-foreground">{quiz.description}</p>
        <p className="text-xs text-muted-foreground">{quiz.questionCount} questions</p>

        {analytics && (
          <div className="bg-secondary/50 rounded-lg p-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Responses</p>
              <p className="font-semibold text-sm">{analytics.totalResponses}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average</p>
              <p className="font-semibold text-sm">{analytics.averageScore}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Highest</p>
              <p className="font-semibold text-sm">{analytics.highestScore}%</p>
            </div>
          </div>
        )}

        {analytics && analytics.totalResponses > 0 && (
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-2">Lowest Score</p>
            <p className="font-semibold text-sm">{analytics.lowestScore}%</p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={quiz.isActive ? "destructive" : "default"}
            onClick={() => onToggle(quiz._id, quiz.isActive)}
            className="text-xs"
          >
            {quiz.isActive ? "End Quiz" : "Start Quiz"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs text-destructive hover:text-destructive bg-transparent"
            onClick={() => onDelete(quiz._id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
