import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Quiz, QuizResult } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { quizId, studentEmail, answers } = await req.json()

    if (!quizId || !studentEmail || !answers) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (!ObjectId.isValid(quizId)) {
      return NextResponse.json({ message: "Invalid quiz ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const quizzesCollection = db.collection<Quiz>("quizzes")
    const resultsCollection = db.collection<QuizResult>("results")

    const quiz = await quizzesCollection.findOne({ _id: new ObjectId(quizId) })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
    }

    // Calculate score
    let score = 0
    const processedAnswers = quiz.questions.map((question) => {
      const selectedAnswer = answers[question._id?.toString() || ""]
      const isCorrect = selectedAnswer === question.answer
      if (isCorrect) score++

      return {
        questionId: question._id?.toString() || "",
        selectedAnswer,
        isCorrect,
      }
    })

    const result: QuizResult = {
      studentEmail,
      quizId,
      quizTitle: quiz.title,
      score,
      total: quiz.questions.length,
      answers: processedAnswers,
      timestamp: new Date(),
    }

    const insertResult = await resultsCollection.insertOne(result)

    return NextResponse.json(
      {
        message: "Result submitted successfully",
        result: {
          _id: insertResult.insertedId.toString(),
          score,
          total: quiz.questions.length,
          percentage: ((score / quiz.questions.length) * 100).toFixed(1),
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Submit result error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
