"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Column as ColumnType } from "@/lib/types";
import { CardView } from "./Card";
import { AddCardForm } from "./AddCardForm";

type ColumnProps = {
  column: ColumnType;
  onRename: (name: string) => void;
  onAddCard: (title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({ column, onRename, onAddCard, onDeleteCard }: ColumnProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(column.name);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const { setNodeRef } = useDroppable({ id: column.id });

  function commitRename() {
    const trimmed = draftName.trim();
    setIsEditingName(false);
    if (trimmed && trimmed !== column.name) {
      onRename(trimmed);
    } else {
      setDraftName(column.name);
    }
  }

  return (
    <div
      data-testid={`column-${column.id}`}
      className="flex min-w-64 flex-1 flex-col rounded-xl border-t-4 border-accent-yellow bg-white shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
        {isEditingName ? (
          <input
            autoFocus
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            onBlur={commitRename}
            onKeyDown={(event) => {
              if (event.key === "Enter") commitRename();
              if (event.key === "Escape") {
                setDraftName(column.name);
                setIsEditingName(false);
              }
            }}
            className="w-full rounded border border-blue-primary px-1 py-0.5 text-sm font-semibold text-navy outline-none"
          />
        ) : (
          <h2
            onClick={() => setIsEditingName(true)}
            className="cursor-text text-sm font-semibold text-navy"
            title="Click to rename"
          >
            {column.name}
          </h2>
        )}
        <span className="shrink-0 text-xs text-gray-text">{column.cards.length}</span>
      </div>

      <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          data-testid={`column-dropzone-${column.id}`}
          className="flex min-h-[2rem] flex-1 flex-col gap-2 px-3 pb-3"
        >
          {column.cards.map((card) => (
            <CardView
              key={card.id}
              card={card}
              columnId={column.id}
              onDelete={() => onDeleteCard(card.id)}
            />
          ))}
        </div>
      </SortableContext>

      <div className="px-3 pb-3">
        {isAddingCard ? (
          <AddCardForm
            onAdd={(title, details) => {
              onAddCard(title, details);
              setIsAddingCard(false);
            }}
            onCancel={() => setIsAddingCard(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsAddingCard(true)}
            className="w-full rounded-lg px-2 py-1.5 text-left text-sm text-gray-text transition-colors hover:bg-purple-secondary/10 hover:text-purple-secondary"
          >
            + Add card
          </button>
        )}
      </div>
    </div>
  );
}
