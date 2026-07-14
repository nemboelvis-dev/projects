import { Board } from "./types";

export type BoardAction =
  | { type: "ADD_CARD"; columnId: string; title: string; details: string; id?: string }
  | { type: "DELETE_CARD"; columnId: string; cardId: string }
  | { type: "RENAME_COLUMN"; columnId: string; name: string }
  | {
      type: "MOVE_CARD";
      cardId: string;
      sourceColumnId: string;
      targetColumnId: string;
      overCardId: string | null;
    };

export function boardReducer(board: Board, action: BoardAction): Board {
  switch (action.type) {
    case "ADD_CARD": {
      const newCard = {
        id: action.id ?? crypto.randomUUID(),
        title: action.title,
        details: action.details,
      };
      return {
        columns: board.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cards: [...column.cards, newCard] }
            : column
        ),
      };
    }

    case "DELETE_CARD": {
      return {
        columns: board.columns.map((column) =>
          column.id === action.columnId
            ? { ...column, cards: column.cards.filter((card) => card.id !== action.cardId) }
            : column
        ),
      };
    }

    case "RENAME_COLUMN": {
      return {
        columns: board.columns.map((column) =>
          column.id === action.columnId ? { ...column, name: action.name } : column
        ),
      };
    }

    case "MOVE_CARD": {
      const { cardId, sourceColumnId, targetColumnId, overCardId } = action;
      const sourceColumn = board.columns.find((column) => column.id === sourceColumnId);
      const card = sourceColumn?.cards.find((c) => c.id === cardId);
      if (!card) return board;

      const withoutCard = board.columns.map((column) =>
        column.id === sourceColumnId
          ? { ...column, cards: column.cards.filter((c) => c.id !== cardId) }
          : column
      );

      return {
        columns: withoutCard.map((column) => {
          if (column.id !== targetColumnId) return column;
          const insertIndex = overCardId
            ? column.cards.findIndex((c) => c.id === overCardId)
            : -1;
          const cards = [...column.cards];
          cards.splice(insertIndex === -1 ? cards.length : insertIndex, 0, card);
          return { ...column, cards };
        }),
      };
    }

    default:
      return board;
  }
}
