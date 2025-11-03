import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="reveal-up">
          <h1 className="text-3xl md:text-5xl font-semibold text-pretty">
            <span className="gradient-text block text-balance md:text-6xl font-bold">Brainify 🧠</span>
            Learn Smarter. Quiz Faster. Level Up with AI.
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Brainify helps you practice effectively with instant feedback, progress tracking, and AI-powered quiz
            recommendations.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <Link href="/register">
              <Button className="btn-gradient rounded-full px-6 py-2.5 hover:shadow-lg transition-all">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-full px-6 py-2.5 transition-all hover:shadow-md hover:bg-secondary bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side: replace photo with gradient-only card */}
        <div className="soft-card border border-border bg-card p-8 reveal-up">
          <div
            aria-hidden
            className="h-56 md:h-72 w-full rounded-xl"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            }}
          />
          <p className="sr-only">Decorative gradient preview</p>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { title: "AI Recommendations", desc: "Get quiz suggestions tailored to your progress." },
          { title: "Instant Feedback", desc: "See correct answers and explanations immediately." },
          { title: "Progress Tracking", desc: "Monitor your performance over time." },
        ].map((f) => (
          <div key={f.title} className="soft-card border border-border bg-card p-5 transition-all hover:shadow-lg">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="mt-16 border-t border-border py-6 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Brainify</p>
          <nav className="flex gap-4">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
