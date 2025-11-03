import { NextResponse } from "next/server"

export async function GET(_: Request, { params }: { params: { userId: string } }) {
  const seed = params.userId?.length ?? 1
  const recs = [
    { id: "js-basics", title: "JavaScript Basics", difficulty: "Easy" },
    { id: "html-fundamentals", title: "HTML Fundamentals", difficulty: "Medium" },
  ]
  // Rotate recommendations a bit based on seed
  const rotated = seed % 2 === 0 ? recs : recs.reverse()
  return NextResponse.json({ recommendations: rotated })
}
