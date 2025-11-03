import type { StoredQuiz } from "./local-store"

export const sampleQuizzes: StoredQuiz[] = [
  {
    id: "js-basics",
    title: "JavaScript Basics",
    description: "Test your knowledge of variables, types, and control flow.",
    questions: [
      {
        id: "q1",
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "func", "scope"],
        answer: "let",
      },
      {
        id: "q2",
        question: "What is the result of typeof null?",
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        answer: '"object"',
      },
    ],
    createdBy: "system",
    isActive: true,
  },
  {
    id: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Assess your understanding of semantic HTML and structure.",
    questions: [
      {
        id: "q1",
        question: "Which tag is used for the most important heading?",
        options: ["<h6>", "<h1>", "<head>", "<title>"],
        answer: "<h1>",
      },
      {
        id: "q2",
        question: "Which element represents independent content?",
        options: ["<section>", "<article>", "<aside>", "<div>"],
        answer: "<article>",
      },
    ],
    createdBy: "system",
    isActive: true,
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    description: "Master React Hooks and functional components.",
    questions: [
      {
        id: "q1",
        question: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        answer: "useState",
      },
      {
        id: "q2",
        question: "What does useEffect do?",
        options: ["Manages component state", "Performs side effects", "Handles routing", "Manages context"],
        answer: "Performs side effects",
      },
    ],
    createdBy: "system",
    isActive: true,
  },
  {
    id: "css-flexbox",
    title: "CSS Flexbox",
    description: "Learn CSS Flexbox layout techniques.",
    questions: [
      {
        id: "q1",
        question: "Which property creates a flex container?",
        options: ["display: grid", "display: flex", "display: block", "display: inline"],
        answer: "display: flex",
      },
      {
        id: "q2",
        question: "What does justify-content do?",
        options: ["Aligns items vertically", "Aligns items horizontally", "Sets item size", "Sets item color"],
        answer: "Aligns items horizontally",
      },
    ],
    createdBy: "system",
    isActive: true,
  },
  {
    id: "typescript-basics",
    title: "TypeScript Basics",
    description: "Understand TypeScript types and interfaces.",
    questions: [
      {
        id: "q1",
        question: "What is the purpose of TypeScript?",
        options: [
          "Add styling to JavaScript",
          "Add type safety to JavaScript",
          "Replace JavaScript",
          "Manage databases",
        ],
        answer: "Add type safety to JavaScript",
      },
      {
        id: "q2",
        question: "How do you define a type in TypeScript?",
        options: ["Using 'class'", "Using 'interface' or 'type'", "Using 'function'", "Using 'const'"],
        answer: "Using 'interface' or 'type'",
      },
    ],
    createdBy: "system",
    isActive: true,
  },
]

export function initializeSampleQuizzes() {
  if (typeof window === "undefined") return

  const existingQuizzes = localStorage.getItem("brainify_quizzes")
  if (!existingQuizzes) {
    localStorage.setItem("brainify_quizzes", JSON.stringify(sampleQuizzes))
  }
}
