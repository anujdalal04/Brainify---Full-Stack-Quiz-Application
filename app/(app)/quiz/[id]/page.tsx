"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { apiCall } from "@/lib/api-client"

interface Quiz {
  _id: string
  title: string
  description: string
  questions: Array<{
    _id: string
    question: string
    options: string[]
    answer: string
  }>
}

export default function QuizPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { toast } = useToast()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const protectedRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchQuiz = async () => {
      const { data, error } = await apiCall<{ quiz: Quiz }>(`/api/quiz/get/${params.id}`, {
        method: "GET",
      })

      if (error) {
        toast({ title: "Error", description: "Failed to load quiz" })
        setLoading(false)
        return
      }

      if (data) {
        setQuiz(data.quiz)
      }
      setLoading(false)
    }

    fetchQuiz()
  }, [params.id, toast])

  useEffect(() => {
    if (!started) return
    if (secondsLeft === null) setSecondsLeft(120)
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s === null) return null
        if (s <= 1) {
          clearInterval(id)
          submit()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  useEffect(() => {
    if (!started) return
    const node = protectedRef.current
    if (!node) return
    const onContext = (e: Event) => {
      e.preventDefault()
      toast({ title: "Copy disabled", description: "Copy/paste and inspection are disabled during the quiz." })
    }
    const onKey = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey
      const blocked =
        (ctrl && (e.key.toLowerCase() === "c" || e.key.toLowerCase() === "v" || e.key.toLowerCase() === "x")) ||
        (ctrl && e.shiftKey && e.key.toLowerCase() === "i") ||
        e.key === "F12"
      if (blocked) {
        e.preventDefault()
        e.stopPropagation()
        toast({ title: "Action blocked", description: "Copy, paste, and inspect are disabled during the quiz." })
      }
    }
    node.addEventListener("contextmenu", onContext)
    window.addEventListener("keydown", onKey, true)
    return () => {
      node.removeEventListener("contextmenu", onContext)
      window.removeEventListener("keydown", onKey, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, protectedRef.current])

  if (loading) return <p className="text-muted-foreground">Loading quiz...</p>
  if (!quiz) return <p className="text-destructive">Quiz not found.</p>

  const total = quiz.questions.length
  const current = quiz.questions[index]

  const begin = () => setStarted(true)
  const select = (qid: string, opt: string) => setAnswers((a) => ({ ...a, [qid]: opt }))

  const submit = async () => {
    const user = JSON.parse(localStorage.getItem("brainify_user") || "{}")

    if (!user.email) {
      toast({ title: "Not logged in", description: "Please log in again." })
      router.replace("/login")
      return
    }

    const { data, error } = await apiCall<{ result: { score: number; total: number; percentage: string } }>(
      "/api/result/submit",
      {
        method: "POST",
        body: JSON.stringify({
          quizId: quiz._id,
          studentEmail: user.email,
          answers,
        }),
      },
    )

    if (error) {
      toast({ title: "Error", description: "Failed to submit quiz" })
      return
    }

    if (data) {
      toast({ title: "Submitted", description: `You scored ${data.result.score} / ${data.result.total}.` })
      router.push("/student-dashboard")
    }
  }

  const percent = total > 0 ? Math.round(((index + 1) / total) * 100) : 0
  const mm = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0
  const ss = secondsLeft !== null ? (secondsLeft % 60).toString().padStart(2, "0") : "00"

  return (
    <div className="grid gap-6">
      <Card className="soft-card">
        <CardHeader>
          <CardTitle className="text-pretty">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {!started ? (
            <>
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
              <Button className="mt-4 btn-gradient rounded-full px-5" onClick={begin}>
                Start Quiz
              </Button>
            </>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Question {index + 1} of {total}
                </p>
                <div className="text-sm font-medium">
                  {mm}:{ss}
                </div>
              </div>
              <Progress value={percent} className="h-2" />
              <div
                ref={protectedRef}
                className="mt-4 grid gap-3 select-none"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              >
                <h2 className="font-medium">{current.question}</h2>
                <div className="grid gap-2">
                  {current.options.map((opt) => {
                    const checked = answers[current._id] === opt
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-3 rounded-md border border-border p-3 hover:bg-muted cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={current._id}
                          value={opt}
                          checked={checked}
                          onChange={() => select(current._id, opt)}
                          className="accent-[var(--color-primary)]"
                        />
                        <span>{opt}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </CardContent>
        {started && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}>
              Previous
            </Button>
            {index < total - 1 ? (
              <Button className="rounded-full" onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>
                Next
              </Button>
            ) : (
              <Button className="btn-gradient rounded-full px-5" onClick={submit}>
                Submit
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
