"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { apiCall } from "@/lib/api-client"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async () => {
    setError("")

    if (!email || !password || !confirm || !name) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirm) {
      setError("Passwords must match")
      return
    }

    setLoading(true)

    const { data, error: apiError } = await apiCall<{
      user: { email: string; name: string; role: string }
      token: string
    }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password, name, role }),
    })

    if (apiError) {
      setError(apiError)
      setLoading(false)
      return
    }

    if (data) {
      localStorage.setItem("brainify_token", data.token)
      localStorage.setItem(
        "brainify_user",
        JSON.stringify({
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        }),
      )
      window.location.href = role === "teacher" ? "/teacher-dashboard" : "/student-dashboard"
    }
  }

  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Register as:</Label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value as "student" | "teacher")}
                />
                <span className="text-sm">Student</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === "teacher"}
                  onChange={(e) => setRole(e.target.value as "student" | "teacher")}
                />
                <span className="text-sm">Teacher</span>
              </label>
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full bg-primary text-primary-foreground" onClick={handleRegister} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
