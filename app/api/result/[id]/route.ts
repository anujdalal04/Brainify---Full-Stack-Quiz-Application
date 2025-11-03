import { NextResponse } from "next/server"

// In this mock, we cannot fetch prior POST state.
// Provide a synthetic response so the results page works with a direct load in preview.
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const seed = params.id?.length ?? 3
  const total = 5
  const score = Math.max(0, Math.min(total, seed % total))
  const answers = Array.from({ length: total }).map((_, i) => ({
    questionId: `q${i + 1}`,
    questionText: `Question ${i + 1}`,
    correct: i < score,
  }))
  return NextResponse.json({ score, total, answers })
}
