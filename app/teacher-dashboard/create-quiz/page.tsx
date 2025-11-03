"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiCall } from "@/lib/api-client"

interface Question {
  question: string
  options: string[]
  answer: string
}

export default function CreateQuizPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([{ question: "", options: ["", "", "", ""], answer: "" }])
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("brainify_user") || "{}")
    if (!user.email || user.role !== "teacher") {
      router.replace("/login")
      return
    }
    setEmail(user.email)
  }, [router])

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }])
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updated = [...questions]
    if (field === "question") updated[index].question = value
    else if (field === "answer") updated[index].answer = value
    else if (field.startsWith("option-")) {
      const optionIndex = Number.parseInt(field.split("-")[1])
      updated[index].options[optionIndex] = value
    }
    setQuestions(updated)
  }

  const handleSaveQuiz = async () => {
    setError("")

    if (!title.trim()) {
      setError("Please enter a quiz title")
      return
    }

    if (questions.some((q) => !q.question.trim() || q.options.some((o) => !o.trim()) || !q.answer.trim())) {
      setError("Please fill in all question fields")
      return
    }

    setLoading(true)

    const { data, error: apiError } = await apiCall<{ quiz: { _id: string } }>("/api/quiz/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        questions,
        email,
      }),
    })

    if (apiError) {
      setError(apiError)
      setLoading(false)
      return
    }

    if (data) {
      router.push("/teacher-dashboard")
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Create New Quiz</h1>
        <p className="text-muted-foreground">Build a quiz with multiple questions and answers</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input
              id="title"
              placeholder="e.g., Advanced JavaScript"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Brief description of the quiz"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      <div className="grid gap-4 mb-6">
        {questions.map((q, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Question {idx + 1}</CardTitle>
                {questions.length > 1 && (
                  <Button size="sm" variant="destructive" onClick={() => handleRemoveQuestion(idx)} className="text-xs">
                    Remove
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Question Text</Label>
                <Input
                  placeholder="Enter the question"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Options</Label>
                <div className="grid gap-2">
                  {q.options.map((opt, optIdx) => (
                    <Input
                      key={optIdx}
                      placeholder={`Option ${optIdx + 1}`}
                      value={opt}
                      onChange={(e) => handleQuestionChange(idx, `option-${optIdx}`, e.target.value)}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`answer-${idx}`}>Correct Answer</Label>
                <select
                  id={`answer-${idx}`}
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(idx, "answer", e.target.value)}
                  className="border border-input rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select correct answer</option>
                  {q.options.map((opt, optIdx) => (
                    <option key={optIdx} value={opt}>
                      {opt || `Option ${optIdx + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleAddQuestion} variant="outline" className="rounded-full px-5 bg-transparent">
          Add Question
        </Button>
        <Button onClick={handleSaveQuiz} className="btn-gradient rounded-full px-5" disabled={loading}>
          {loading ? "Saving..." : "Save Quiz"}
        </Button>
        <Button onClick={() => router.back()} variant="outline" className="rounded-full px-5 bg-transparent">
          Cancel
        </Button>
      </div>
    </div>
  )
}
