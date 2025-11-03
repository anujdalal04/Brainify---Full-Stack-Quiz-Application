import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { QuizResult } from "@/lib/db-models"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid result ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const resultsCollection = db.collection<QuizResult>("results")

    const result = await resultsCollection.findOne({ _id: new ObjectId(id) })

    if (!result) {
      return NextResponse.json({ message: "Result not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        result: {
          _id: result._id?.toString(),
          studentEmail: result.studentEmail,
          quizTitle: result.quizTitle,
          score: result.score,
          total: result.total,
          percentage: ((result.score / result.total) * 100).toFixed(1),
          answers: result.answers,
          timestamp: result.timestamp,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get result detail error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
