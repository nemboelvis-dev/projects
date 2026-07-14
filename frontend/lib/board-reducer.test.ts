import { describe, expect, it } from "vitest";
import { boardReducer } from "./board-reducer";
import { Board } from "./types";

function makeBoard(): Board {
  return {
    columns: [
      {
        id: "col-a",
        name: "Column A",
        cards: [
          { id: "card-1", title: "First", details: "details 1" },
          { id: "card-2", title: "Second", details: "details 2" },
        ],
      },
      {
        id: "col-b",
        name: "Column B",
        cards: [{ id: "card-3", title: "Third", details: "details 3" }],
      },
    ],
  };
}

describe("boardReducer", () => {
  it("adds a card to the target column", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "ADD_CARD",
      columnId: "col-b",
      title: "New card",
      details: "new details",
      id: "card-new",
    });

    expect(next.columns[1].cards).toHaveLength(2);
    expect(next.columns[1].cards[1]).toEqual({
      id: "card-new",
      title: "New card",
      details: "new details",
    });
    expect(next.columns[0]).toEqual(board.columns[0]);
  });

  it("deletes a card from its column", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "DELETE_CARD",
      columnId: "col-a",
      cardId: "card-1",
    });

    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["card-2"]);
  });

  it("renames a column", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "RENAME_COLUMN",
      columnId: "col-a",
      name: "Renamed",
    });

    expect(next.columns[0].name).toBe("Renamed");
    expect(next.columns[1].name).toBe("Column B");
  });

  it("reorders a card within the same column", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "MOVE_CARD",
      cardId: "card-2",
      sourceColumnId: "col-a",
      targetColumnId: "col-a",
      overCardId: "card-1",
    });

    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["card-2", "card-1"]);
  });

  it("moves a card to a different column at a specific position", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "MOVE_CARD",
      cardId: "card-1",
      sourceColumnId: "col-a",
      targetColumnId: "col-b",
      overCardId: "card-3",
    });

    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["card-2"]);
    expect(next.columns[1].cards.map((c) => c.id)).toEqual(["card-1", "card-3"]);
  });

  it("moves a card to the end of an empty target when overCardId is null", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "MOVE_CARD",
      cardId: "card-3",
      sourceColumnId: "col-b",
      targetColumnId: "col-a",
      overCardId: null,
    });

    expect(next.columns[1].cards).toHaveLength(0);
    expect(next.columns[0].cards.map((c) => c.id)).toEqual(["card-1", "card-2", "card-3"]);
  });

  it("returns the board unchanged if the card cannot be found", () => {
    const board = makeBoard();
    const next = boardReducer(board, {
      type: "MOVE_CARD",
      cardId: "missing",
      sourceColumnId: "col-a",
      targetColumnId: "col-b",
      overCardId: null,
    });

    expect(next).toEqual(board);
  });
});
