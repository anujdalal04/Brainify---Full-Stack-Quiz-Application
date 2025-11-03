"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { RecommendationCard } from "@/components/recommendation-card"

export default function RecommendationsPage() {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("brainify_user") || "{}") : {}
  const userId = user?.id || "demo"
  const { data, isLoading, error } = useSWR(`/api/recommendations/${userId}`, fetcher)

  if (isLoading) return <p>Loading…</p>
  if (error) return <p className="text-destructive">Failed to load recommendations.</p>

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Recommendations</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.recommendations?.map((r: any) => (
          <RecommendationCard key={r.id} id={r.id} title={r.title} difficulty={r.difficulty} />
        ))}
      </div>
    </div>
  )
}
