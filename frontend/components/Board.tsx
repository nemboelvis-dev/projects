"use client";

import { useMemo, useReducer, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { boardReducer } from "@/lib/board-reducer";
import { initialBoard } from "@/lib/seed-data";
import { Card } from "@/lib/types";
import { Column } from "./Column";
import { CardView } from "./Card";

export function Board() {
  const [board, dispatch] = useReducer(boardReducer, initialBoard);
  const [activeCard, setActiveCard] = useState<{ card: Card; columnId: string } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const cardIndex = useMemo(() => {
    const map = new Map<string, { card: Card; columnId: string }>();
    for (const column of board.columns) {
      for (const card of column.cards) {
        map.set(card.id, { card, columnId: column.id });
      }
    }
    return map;
  }, [board]);

  function handleDragStart(event: DragStartEvent) {
    const entry = cardIndex.get(event.active.id as string);
    if (entry) setActiveCard(entry);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const sourceColumnId = active.data.current?.columnId as string | undefined;
    if (!sourceColumnId) return;

    const overColumnId = over.data.current?.columnId as string | undefined;
    const targetColumnId = overColumnId ?? (over.id as string);
    const overCardId = overColumnId ? (over.id as string) : null;

    if (sourceColumnId === targetColumnId && active.id === over.id) return;

    dispatch({
      type: "MOVE_CARD",
      cardId: active.id as string,
      sourceColumnId,
      targetColumnId,
      overCardId,
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-1 gap-4 overflow-x-auto p-6">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onRename={(name) => dispatch({ type: "RENAME_COLUMN", columnId: column.id, name })}
            onAddCard={(title, details) =>
              dispatch({ type: "ADD_CARD", columnId: column.id, title, details })
            }
            onDeleteCard={(cardId) =>
              dispatch({ type: "DELETE_CARD", columnId: column.id, cardId })
            }
          />
        ))}
      </div>
      <DragOverlay>
        {activeCard && (
          <CardView card={activeCard.card} columnId={activeCard.columnId} onDelete={() => {}} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
