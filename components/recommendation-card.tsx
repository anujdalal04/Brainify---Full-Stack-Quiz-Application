import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export function RecommendationCard({ id, title, difficulty }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Recommended level: <span className="rounded bg-muted px-2 py-0.5">{difficulty}</span>
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/quiz/${id}`} className="ml-auto">
          <Button className="bg-primary text-primary-foreground">Take Quiz</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
