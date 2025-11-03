export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-pretty">
        <span className="gradient-text">About Brainify</span>
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Brainify is a modern quiz platform that helps you learn faster with instant feedback, progress tracking, and
        AI-powered recommendations. Practice confidently in a distraction-resistant interface with light and dark modes.
      </p>
      <div className="mt-6 soft-card border border-border bg-card p-6">
        <p className="leading-relaxed">
          Our mission is to make effective practice accessible to everyone. We combine clean, minimal design with
          intelligent guidance so you can focus on what matters: learning.
        </p>
      </div>
    </main>
  )
}
