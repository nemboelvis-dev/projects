import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Board } from "./Board";

describe("Board", () => {
  it("renders all five columns with the seeded dummy cards", () => {
    render(<Board />);

    expect(screen.getByText("Backlog")).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("In Review")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Research competitor products")).toBeInTheDocument();
  });

  it("adds a new card to a column", async () => {
    const user = userEvent.setup();
    render(<Board />);

    const backlogHeading = screen.getByText("Backlog");
    const column = backlogHeading.closest("div")!.parentElement!;
    await user.click(within(column).getByText("+ Add card"));
    await user.type(within(column).getByPlaceholderText("Card title"), "Brand new task");
    await user.click(within(column).getByRole("button", { name: "Add card" }));

    expect(screen.getByText("Brand new task")).toBeInTheDocument();
  });

  it("deletes a card", async () => {
    const user = userEvent.setup();
    render(<Board />);

    expect(screen.getByText("Choose tech stack")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Delete Choose tech stack" }));

    expect(screen.queryByText("Choose tech stack")).not.toBeInTheDocument();
  });

  it("renames a column", async () => {
    const user = userEvent.setup();
    render(<Board />);

    await user.click(screen.getByText("To Do"));
    const input = screen.getByDisplayValue("To Do");
    await user.clear(input);
    await user.type(input, "Doing Next{Enter}");

    expect(screen.getByText("Doing Next")).toBeInTheDocument();
    expect(screen.queryByText("To Do")).not.toBeInTheDocument();
  });
});
