import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { QuizResult } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { quizId } = await req.json()

    if (!quizId) {
      return NextResponse.json({ message: "Missing quiz ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const resultsCollection = db.collection<QuizResult>("results")

    const results = await resultsCollection.find({ quizId }).toArray()

    if (results.length === 0) {
      return NextResponse.json(
        {
          results: [],
          analytics: {
            totalResponses: 0,
            averageScore: 0,
            highestScore: 0,
            lowestScore: 0,
          },
        },
        { status: 200 },
      )
    }

    const scores = results.map((r) => (r.score / r.total) * 100)
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length
    const highestScore = Math.max(...scores)
    const lowestScore = Math.min(...scores)

    return NextResponse.json(
      {
        results: results.map((r) => ({
          _id: r._id?.toString(),
          studentEmail: r.studentEmail,
          score: r.score,
          total: r.total,
          percentage: ((r.score / r.total) * 100).toFixed(1),
          timestamp: r.timestamp,
        })),
        analytics: {
          totalResponses: results.length,
          averageScore: averageScore.toFixed(1),
          highestScore: highestScore.toFixed(1),
          lowestScore: lowestScore.toFixed(1),
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get quiz results error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
