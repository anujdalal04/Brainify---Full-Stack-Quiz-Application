"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { Loader } from "@/components/loader"
import { QuizCard } from "@/components/quiz-card"

export default function QuizzesPage() {
  const { data, isLoading, error } = useSWR("/api/quiz/all", fetcher)

  if (isLoading) return <Loader />
  if (error) return <p className="text-sm text-destructive">Failed to load quizzes.</p>

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Quizzes</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.quizzes?.map((q: any) => (
          <QuizCard key={q.id} id={q.id} title={q.title} description={q.description} difficulty={q.difficulty} />
        ))}
      </div>
    </div>
  )
}
