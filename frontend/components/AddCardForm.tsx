"use client";

import { FormEvent, useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
  onCancel: () => void;
};

export function AddCardForm({ onAdd, onCancel }: AddCardFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    onAdd(trimmedTitle, details.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
    >
      <input
        autoFocus
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="rounded border border-gray-200 px-2 py-1 text-sm text-navy outline-none focus:border-blue-primary"
      />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        rows={2}
        className="resize-none rounded border border-gray-200 px-2 py-1 text-sm text-navy outline-none focus:border-blue-primary"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-purple-secondary px-3 py-1 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          Add card
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded px-3 py-1 text-sm text-gray-text hover:text-navy"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
