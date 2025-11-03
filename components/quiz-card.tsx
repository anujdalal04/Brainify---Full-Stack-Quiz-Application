import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  id: string
  title: string
  description?: string
  difficulty?: "Easy" | "Medium" | "Hard"
}

export function QuizCard({ id, title, description, difficulty }: Props) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-pretty">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {difficulty && (
          <p className="mt-2 text-xs">
            Difficulty: <span className="rounded bg-muted px-2 py-0.5">{difficulty}</span>
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/quiz/${id}`} className="ml-auto">
          <Button className="bg-primary text-primary-foreground">Take Quiz</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
