import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Quiz } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ message: "Missing email" }, { status: 400 })
    }

    const db = await getDatabase()
    const quizzesCollection = db.collection<Quiz>("quizzes")

    const quizzes = await quizzesCollection.find({ createdBy: email }).toArray()

    return NextResponse.json(
      {
        quizzes: quizzes.map((q) => ({
          _id: q._id?.toString(),
          title: q.title,
          description: q.description,
          questionCount: q.questions.length,
          createdBy: q.createdBy,
          isActive: q.isActive,
          createdAt: q.createdAt,
        })),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get teacher quizzes error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
