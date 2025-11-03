export type StoredQuizQuestion = {
  id: string
  question: string
  options: string[] // exactly 4
  answer: string // one of options
}

export type StoredQuiz = {
  id: string
  title: string
  description?: string
  questions: StoredQuizQuestion[]
  createdBy?: string // track which teacher created the quiz
  isActive?: boolean // track if quiz is currently active
}

export type StoredResult = {
  studentEmail: string
  quizId: string
  quizTitle: string
  score: number
  total: number
  timestamp: number
}

export type StoredUser = {
  email: string
  role: "admin" | "student" | "teacher" // added teacher role
  name?: string
}

const KEYS = {
  user: "brainify_user",
  quizzes: "brainify_quizzes",
  results: "brainify_results",
} as const

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null
  return safeParse<StoredUser | null>(localStorage.getItem(KEYS.user), null)
}

export function setUser(user: StoredUser) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function clearUser() {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEYS.user)
}

export function getQuizzes(): StoredQuiz[] {
  if (typeof window === "undefined") return []
  return safeParse<StoredQuiz[]>(localStorage.getItem(KEYS.quizzes), [])
}

export function saveQuiz(quiz: StoredQuiz) {
  if (typeof window === "undefined") return
  const existing = getQuizzes()
  const idx = existing.findIndex((q) => q.id === quiz.id)
  if (idx >= 0) existing[idx] = quiz
  else existing.push(quiz)
  localStorage.setItem(KEYS.quizzes, JSON.stringify(existing))
}

export function getResults(): StoredResult[] {
  if (typeof window === "undefined") return []
  return safeParse<StoredResult[]>(localStorage.getItem(KEYS.results), [])
}

export function saveResult(result: StoredResult) {
  if (typeof window === "undefined") return
  const existing = getResults()
  existing.push(result)
  localStorage.setItem(KEYS.results, JSON.stringify(existing))
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export function getQuizzesByTeacher(teacherEmail: string): StoredQuiz[] {
  if (typeof window === "undefined") return []
  const allQuizzes = getQuizzes()
  return allQuizzes.filter((q) => q.createdBy === teacherEmail)
}

export function updateQuizStatus(quizId: string, isActive: boolean) {
  if (typeof window === "undefined") return
  const existing = getQuizzes()
  const quiz = existing.find((q) => q.id === quizId)
  if (quiz) {
    quiz.isActive = isActive
    localStorage.setItem(KEYS.quizzes, JSON.stringify(existing))
  }
}

export function deleteQuiz(quizId: string) {
  if (typeof window === "undefined") return
  const existing = getQuizzes()
  const filtered = existing.filter((q) => q.id !== quizId)
  localStorage.setItem(KEYS.quizzes, JSON.stringify(filtered))
}
