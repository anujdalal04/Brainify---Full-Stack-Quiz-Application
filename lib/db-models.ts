import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  email: string
  password: string // hashed
  name: string
  role: "student" | "teacher" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface QuizQuestion {
  _id?: ObjectId
  question: string
  options: string[] // exactly 4
  answer: string // one of options
}

export interface Quiz {
  _id?: ObjectId
  title: string
  description?: string
  questions: QuizQuestion[]
  createdBy: string // teacher email
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface QuizResult {
  _id?: ObjectId
  studentEmail: string
  quizId: string // ObjectId as string
  quizTitle: string
  score: number
  total: number
  answers: {
    questionId: string
    selectedAnswer: string
    isCorrect: boolean
  }[]
  timestamp: Date
}

export interface Session {
  _id?: ObjectId
  userId: string // email
  token: string
  expiresAt: Date
  createdAt: Date
}
