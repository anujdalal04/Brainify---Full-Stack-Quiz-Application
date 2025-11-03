import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
  try {
    const { quizId, isActive, email } = await req.json()

    if (!quizId || isActive === undefined || !email) {
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

    await quizzesCollection.updateOne({ _id: new ObjectId(quizId) }, { $set: { isActive, updatedAt: new Date() } })

    return NextResponse.json({ message: "Quiz status updated" }, { status: 200 })
  } catch (error) {
    console.error("Update quiz status error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
