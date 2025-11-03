import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
  try {
    const { quizId, email } = await req.json()

    if (!quizId || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (!ObjectId.isValid(quizId)) {
      return NextResponse.json({ message: "Invalid quiz ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const quizzesCollection = db.collection("quizzes")

    const quiz = await quizzesCollection.findOne({ _id: new ObjectId(quizId) })

    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 })
    }

    if (quiz.createdBy !== email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    await quizzesCollection.deleteOne({ _id: new ObjectId(quizId) })

    return NextResponse.json({ message: "Quiz deleted" }, { status: 200 })
  } catch (error) {
    console.error("Delete quiz error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
