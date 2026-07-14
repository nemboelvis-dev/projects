import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card as CardType } from "@/lib/types";

type CardProps = {
  card: CardType;
  columnId: string;
  onDelete: () => void;
};

export function CardView({ card, columnId, onDelete }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={`card-${card.id}`}
      {...attributes}
      {...listeners}
      className="group rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-navy">{card.title}</h3>
        <button
          type="button"
          aria-label={`Delete ${card.title}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onDelete}
          className="shrink-0 text-gray-text opacity-0 transition-opacity hover:text-purple-secondary group-hover:opacity-100"
        >
          ×
        </button>
      </div>
      {card.details && <p className="mt-1 text-xs text-gray-text">{card.details}</p>}
    </div>
  );
}
