# Kanban Board

A single-board Kanban app with five renameable columns. Cards have a title
and details, and can be added, deleted, and dragged between columns. State
is in-memory only and resets to seeded dummy data on refresh.

## Stack

Next.js (App Router, client-rendered), TypeScript, Tailwind CSS, @dnd-kit.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Testing

```bash
npm run test       # unit tests (Vitest + React Testing Library)
npm run test:e2e   # integration tests (Playwright)
```
