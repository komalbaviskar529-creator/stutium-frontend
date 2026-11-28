 "use client";

import { Gift } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const MAX = 150;

export function MessageCardBox() {
  const { note, setNote } = useCart();

  return (
    <section className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5">
      <label className="flex cursor-pointer items-center gap-3 text-sm font-bold sm:text-base">
        <input
          type="checkbox"
          checked={note !== null}
          onChange={(e) => setNote(e.target.checked ? "" : null)}
          className="size-4 shrink-0 accent-brand-600"
        />
        <Gift className="size-5 shrink-0 text-brand-600" aria-hidden />
        Add a free message card
      </label>
      {note !== null && (
        <div className="mt-3">
          <label htmlFor="message-note" className="sr-only">
            Message for the card
          </label>
          <textarea
            id="message-note"
            maxLength={MAX}
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your message (max 150 characters)"
            className="w-full rounded-xl border border-line bg-white p-3 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-brand-600"
          />
          <p className="mt-1 text-right text-xs text-muted">
            {note.length}/{MAX}
          </p>
        </div>
      )}
    </section>
  );
}