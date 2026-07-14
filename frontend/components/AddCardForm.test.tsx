import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddCardForm } from "./AddCardForm";

describe("AddCardForm", () => {
  it("submits the trimmed title and details", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

    await user.type(screen.getByPlaceholderText("Card title"), "  My title  ");
    await user.type(screen.getByPlaceholderText("Details"), "  Some details  ");
    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(onAdd).toHaveBeenCalledWith("My title", "Some details");
  });

  it("does not submit when the title is empty", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<AddCardForm onAdd={onAdd} onCancel={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Add card" }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(<AddCardForm onAdd={vi.fn()} onCancel={onCancel} />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalled();
  });
});
