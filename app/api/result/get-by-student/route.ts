import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { QuizResult } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { studentEmail } = await req.json()

    if (!studentEmail) {
      return NextResponse.json({ message: "Missing student email" }, { status: 400 })
    }

    const db = await getDatabase()
    const resultsCollection = db.collection<QuizResult>("results")

    const results = await resultsCollection.find({ studentEmail }).sort({ timestamp: -1 }).toArray()

    return NextResponse.json(
      {
        results: results.map((r) => ({
          _id: r._id?.toString(),
          quizTitle: r.quizTitle,
          score: r.score,
          total: r.total,
          percentage: ((r.score / r.total) * 100).toFixed(1),
          timestamp: r.timestamp,
        })),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get student results error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
