import { Board } from "./types";

export const initialBoard: Board = {
  columns: [
    {
      id: "backlog",
      name: "Backlog",
      cards: [
        {
          id: "card-1",
          title: "Research competitor products",
          details: "Compare features and pricing of the top three competitors.",
        },
        {
          id: "card-2",
          title: "Define MVP scope",
          details: "Agree on the must-have features for the first release.",
        },
      ],
    },
    {
      id: "todo",
      name: "To Do",
      cards: [
        {
          id: "card-3",
          title: "Design board layout",
          details: "Create wireframes for the board and card components.",
        },
        {
          id: "card-4",
          title: "Set up project repository",
          details: "Initialize the repository and configure tooling.",
        },
        {
          id: "card-5",
          title: "Write onboarding checklist",
          details: "List the steps a new team member needs to get started.",
        },
      ],
    },
    {
      id: "in-progress",
      name: "In Progress",
      cards: [
        {
          id: "card-6",
          title: "Build drag and drop board",
          details: "Implement moving cards between columns.",
        },
        {
          id: "card-7",
          title: "Style column headers",
          details: "Apply the brand color palette to headers and buttons.",
        },
      ],
    },
    {
      id: "in-review",
      name: "In Review",
      cards: [
        {
          id: "card-8",
          title: "Review card component API",
          details: "Confirm the title and details props match the design.",
        },
      ],
    },
    {
      id: "done",
      name: "Done",
      cards: [
        {
          id: "card-9",
          title: "Choose tech stack",
          details: "Settled on Next.js, TypeScript, and Tailwind CSS.",
        },
        {
          id: "card-10",
          title: "Set up color palette",
          details: "Documented the brand colors for the UI.",
        },
      ],
    },
  ],
};
