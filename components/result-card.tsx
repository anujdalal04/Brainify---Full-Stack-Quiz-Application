import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  score: number
  total: number
}

export function ResultCard({ score, total }: Props) {
  const pct = Math.round((score / total) * 100)
  const message = pct >= 85 ? "Excellent!" : pct >= 60 ? "Nice work!" : "Keep practicing!"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Result</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">
          Score: <span className="font-semibold">{score}</span> / {total} ({pct}%)
        </p>
        <p className="mt-2 text-muted-foreground">{message}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href="/recommendations">
          <Button className="bg-primary text-primary-foreground">Get Recommendations</Button>
        </Link>
        <Link href="/quizzes">
          <Button variant="outline">Take Another Quiz</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
