"use client";

import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/Board").then((mod) => mod.Board), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b-2 border-accent-yellow bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-navy">Kanban Board</h1>
      </header>
      <Board />
    </div>
  );
}
