import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { verifyPassword, generateToken } from "@/lib/auth-utils"
import type { User } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json()

    if (!email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    const user = await usersCollection.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    if (!verifyPassword(password, user.password)) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    if (user.role !== role) {
      return NextResponse.json({ message: "Invalid role for this account" }, { status: 401 })
    }

    const token = generateToken()
    const sessionsCollection = db.collection("sessions")
    await sessionsCollection.insertOne({
      userId: email,
      token,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
