import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 })
    }

    const db = await getDatabase()
    const sessionsCollection = db.collection("sessions")

    await sessionsCollection.deleteOne({ token })

    return NextResponse.json({ message: "Logout successful" }, { status: 200 })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
