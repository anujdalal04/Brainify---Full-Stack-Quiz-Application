import { NextResponse } from "next/server"
import { quizzes } from "@/lib/mock-data"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const quiz = quizzes.find((q) => q.id === params.id)
  if (!quiz) return new NextResponse("Not Found", { status: 404 })
  return NextResponse.json({ quiz })
}
