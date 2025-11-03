"use client"

import { useState } from "react"
import { slugify, saveQuiz } from "@/lib/local-store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type FormQuestion = {
  id: string
  question: string
  options: string[]
  answerIndex: number
}

export default function CreateQuizPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<FormQuestion[]>([
    { id: crypto.randomUUID(), question: "", options: ["", "", "", ""], answerIndex: 0 },
  ])
  const router = useRouter()
  const { toast } = useToast()

  const addQuestion = () => {
    setQuestions((qs) => [...qs, { id: crypto.randomUUID(), question: "", options: ["", "", "", ""], answerIndex: 0 }])
  }

  const updateQ = (qid: string, patch: Partial<FormQuestion>) => {
    setQuestions((qs) => qs.map((q) => (q.id === qid ? { ...q, ...patch } : q)))
  }

  const updateOption = (qid: string, idx: number, value: string) => {
    setQuestions((qs) =>
      qs.map((q) => (q.id === qid ? { ...q, options: q.options.map((o, i) => (i === idx ? value : o)) } : q)),
    )
  }

  const save = () => {
    const clean = questions
      .filter((q) => q.question.trim() && q.options.every((o) => o.trim()))
      .map((q) => ({
        id: q.id,
        question: q.question.trim(),
        options: q.options.map((o) => o.trim()),
        answer: q.options[q.answerIndex].trim(),
      }))

    if (!title.trim() || clean.length === 0) {
      toast({ title: "Missing info", description: "Please add a title and at least one complete question." })
      return
    }

    const quiz = {
      id: slugify(title),
      title: title.trim(),
      description: description.trim(),
      questions: clean,
    }
    saveQuiz(quiz)
    toast({ title: "Quiz saved", description: "Your quiz is now available to students." })
    router.push("/admin-dashboard")
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Create Quiz</h1>
      <Card className="soft-card">
        <CardHeader>
          <CardTitle className="text-pretty">Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sample Quiz" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Basic React Questions"
            />
          </div>

          <div className="grid gap-4">
            {questions.map((q, idx) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-base">Question {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="grid gap-2">
                    <Label>Prompt</Label>
                    <Input value={q.question} onChange={(e) => updateQ(q.id, { question: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Options (choose correct)</Label>
                    <div className="grid gap-2">
                      {q.options.map((opt, i) => (
                        <label key={i} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${q.id}`}
                            checked={q.answerIndex === i}
                            onChange={() => updateQ(q.id, { answerIndex: i })}
                            className="accent-[var(--color-primary)]"
                          />
                          <Input
                            value={opt}
                            onChange={(e) => updateOption(q.id, i, e.target.value)}
                            placeholder={`Option ${i + 1}`}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={addQuestion}>
            Add Question
          </Button>
          <Button className="btn-gradient rounded-full px-5" onClick={save}>
            Save Quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
