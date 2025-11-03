import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Quiz } from "@/lib/db-models"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid quiz ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const quizzesCollection = db.collection<Quiz>("quizzes")

    const quiz = await quizzesCollection.findOne({ _id: new ObjectId(id) })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        quiz: {
          _id: quiz._id?.toString(),
          title: quiz.title,
          description: quiz.description,
          questions: quiz.questions.map((q) => ({
            _id: q._id?.toString(),
            question: q.question,
            options: q.options,
            answer: q.answer,
          })),
          createdBy: quiz.createdBy,
          isActive: quiz.isActive,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get quiz error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
