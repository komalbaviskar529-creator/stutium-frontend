import { cn } from "@/lib/cn";
import type { Slot } from "@/lib/delivery";
import { rupees } from "@/lib/format";

type Props = { slots: Slot[]; selectedId?: string; onSelect: (slot: Slot) => void };

export function DeliverySlots({ slots, selectedId, onSelect }: Props) {
  return (
    <div role="radiogroup" aria-label="Delivery date" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {slots.map((s) => {
        const selected = s.id === selectedId;
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(s)}
            className={cn(
              "rounded-xl p-3 text-left ring-1 transition focus-visible:outline-2 focus-visible:outline-brand-600",
              selected ? "bg-brand-50 ring-2 ring-brand-600" : "bg-white ring-line hover:ring-brand-600"
            )}
          >
            <span className="block font-bold">{s.label}</span>
            <span className="block text-xs text-muted">{s.dateLabel}</span>
            <span className={cn("mt-1 block text-sm font-semibold", s.fee ? "text-brand-700" : "text-green-700")}>
              {s.fee ? `+${rupees(s.fee)}` : "Free"}
            </span>
          </button>
        );
      })}
    </div>
  );
}