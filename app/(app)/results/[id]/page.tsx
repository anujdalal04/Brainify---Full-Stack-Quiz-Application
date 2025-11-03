"use client"

import { useParams } from "next/navigation"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { ResultCard } from "@/components/result-card"

export default function ResultPage() {
  const params = useParams<{ id: string }>()
  const { data, isLoading, error } = useSWR(`/api/result/${params.id}`, fetcher)

  if (isLoading) return <p>Loading…</p>
  if (error || !data) return <p className="text-destructive">Failed to load result.</p>

  return (
    <div className="max-w-xl">
      <ResultCard score={data.score} total={data.total} />
      <div className="mt-4 rounded-md border border-border bg-card p-4">
        <h3 className="font-semibold mb-2">Answer Review</h3>
        <ul className="list-disc pl-5 text-sm">
          {data.answers?.map((a: any) => (
            <li key={a.questionId} className="mb-1">
              {a.questionText} — {a.correct ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
