"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { apiCall } from "@/lib/api-client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)

    const { data, error: apiError } = await apiCall<{
      user: { email: string; name: string; role: string }
      token: string
    }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password, role }),
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
      window.location.href = data.user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard"
    }
  }

  return (
    <main className="grid min-h-[70dvh] place-items-center px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
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
            <Label>Login as:</Label>
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
          <div className="text-right">
            <Link href="#" className="text-xs text-muted-foreground hover:underline">
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full bg-primary text-primary-foreground rounded-full btn-gradient btn-glow"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-xs text-muted-foreground">
            New here?{" "}
            <Link href="/register" className="hover:underline">
              Create Account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
