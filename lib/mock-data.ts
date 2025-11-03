export type QuizQuestion = {
  id: string
  text: string
  options: { id: string; text: string; correct?: boolean }[]
}

export type Quiz = {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  questions: QuizQuestion[]
}

export const quizzes: Quiz[] = [
  {
    id: "js-basics",
    title: "JavaScript Basics",
    description: "Test your knowledge of variables, types, and control flow.",
    difficulty: "Easy",
    questions: [
      {
        id: "q1",
        text: "Which keyword declares a block-scoped variable?",
        options: [
          { id: "a", text: "var" },
          { id: "b", text: "let", correct: true },
          { id: "c", text: "func" },
          { id: "d", text: "scope" },
        ],
      },
      {
        id: "q2",
        text: "What is the result of typeof null?",
        options: [
          { id: "a", text: '"null"' },
          { id: "b", text: '"undefined"' },
          { id: "c", text: '"object"', correct: true },
          { id: "d", text: '"number"' },
        ],
      },
    ],
  },
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Assess your understanding of semantic HTML and structure.",
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        text: "Which tag is used for the most important heading?",
        options: [
          { id: "a", text: "<h6>" },
          { id: "b", text: "<h1>", correct: true },
          { id: "c", text: "<head>" },
          { id: "d", text: "<title>" },
        ],
      },
      {
        id: "q2",
        text: "Which element represents independent content?",
        options: [
          { id: "a", text: "<section>" },
          { id: "b", text: "<article>", correct: true },
          { id: "c", text: "<aside>" },
          { id: "d", text: "<div>" },
        ],
      },
    ],
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    description: "Master React Hooks and functional components.",
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        text: "Which hook is used to manage state in functional components?",
        options: [
          { id: "a", text: "useEffect" },
          { id: "b", text: "useState", correct: true },
          { id: "c", text: "useContext" },
          { id: "d", text: "useReducer" },
        ],
      },
      {
        id: "q2",
        text: "What does useEffect do?",
        options: [
          { id: "a", text: "Manages component state" },
          { id: "b", text: "Performs side effects", correct: true },
          { id: "c", text: "Handles routing" },
          { id: "d", text: "Manages context" },
        ],
      },
    ],
  },
  {
    id: "css-flexbox",
    title: "CSS Flexbox",
    description: "Learn CSS Flexbox layout techniques.",
    difficulty: "Easy",
    questions: [
      {
        id: "q1",
        text: "Which property creates a flex container?",
        options: [
          { id: "a", text: "display: grid" },
          { id: "b", text: "display: flex", correct: true },
          { id: "c", text: "display: block" },
          { id: "d", text: "display: inline" },
        ],
      },
      {
        id: "q2",
        text: "What does justify-content do?",
        options: [
          { id: "a", text: "Aligns items vertically" },
          { id: "b", text: "Aligns items horizontally", correct: true },
          { id: "c", text: "Sets item size" },
          { id: "d", text: "Sets item color" },
        ],
      },
    ],
  },
  {
    id: "typescript-basics",
    title: "TypeScript Basics",
    description: "Understand TypeScript types and interfaces.",
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        text: "What is the purpose of TypeScript?",
        options: [
          { id: "a", text: "Add styling to JavaScript" },
          { id: "b", text: "Add type safety to JavaScript", correct: true },
          { id: "c", text: "Replace JavaScript" },
          { id: "d", text: "Manage databases" },
        ],
      },
      {
        id: "q2",
        text: "How do you define a type in TypeScript?",
        options: [
          { id: "a", text: "Using 'class'" },
          { id: "b", text: "Using 'interface' or 'type'", correct: true },
          { id: "c", text: "Using 'function'" },
          { id: "d", text: "Using 'const'" },
        ],
      },
    ],
  },
]
