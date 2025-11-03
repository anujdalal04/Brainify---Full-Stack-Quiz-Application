import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Quiz } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { title, description, questions, email } = await req.json()

    if (!title || !questions || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ message: "Quiz must have at least one question" }, { status: 400 })
    }

    const db = await getDatabase()
    const quizzesCollection = db.collection<Quiz>("quizzes")

    const newQuiz: Quiz = {
      title,
      description: description || "",
      questions: questions.map((q) => ({
        _id: new ObjectId(),
        question: q.question,
        options: q.options,
        answer: q.answer,
      })),
      createdBy: email,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await quizzesCollection.insertOne(newQuiz)

    return NextResponse.json(
      {
        message: "Quiz created successfully",
        quiz: {
          _id: result.insertedId,
          ...newQuiz,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Quiz creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
