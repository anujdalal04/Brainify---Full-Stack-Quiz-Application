import { NextResponse } from "next/server"
import { quizzes } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({
    quizzes: quizzes.map(({ id, title, description, difficulty }) => ({
      id,
      title,
      description,
      difficulty,
    })),
  })
}
