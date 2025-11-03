import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { User } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 400 })
    }

    const db = await getDatabase()
    const sessionsCollection = db.collection("sessions")

    const session = await sessionsCollection.findOne({
      token,
      expiresAt: { $gt: new Date() },
    })

    if (!session) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 })
    }

    const usersCollection = db.collection<User>("users")
    const user = await usersCollection.findOne({ email: session.userId })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Verify error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
