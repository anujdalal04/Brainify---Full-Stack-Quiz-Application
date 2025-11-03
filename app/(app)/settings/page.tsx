"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function SettingsPage() {
  const [name, setName] = useState("Brainify User")
  const [email, setEmail] = useState("you@example.com")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("brainify_theme") as "light" | "dark" | null
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    if (typeof window !== "undefined") {
      localStorage.setItem("brainify_theme", next)
      document.documentElement.classList.toggle("dark", next === "dark")
    }
  }

  return (
    <div className="max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Appearance</Label>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={toggleTheme}>
                Toggle {theme === "light" ? "Dark" : "Light"} Mode
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-primary text-primary-foreground">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
