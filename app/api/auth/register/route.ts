import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { hashPassword, generateToken } from "@/lib/auth-utils"
import type { User } from "@/lib/db-models"

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (!["student", "teacher"].includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 })
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>("users")

    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    const hashedPassword = hashPassword(password)
    const newUser: User = {
      email,
      password: hashedPassword,
      name,
      role: role as "student" | "teacher",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await usersCollection.insertOne(newUser)

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
        message: "User created successfully",
        user: {
          email,
          name,
          role,
        },
        token,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
