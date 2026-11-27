 import { cn } from "@/lib/cn";
import { rupees } from "@/lib/format";
import { ADD_ONS } from "@/lib/pricing";

type Props = { selected: string[]; onToggle: (id: string) => void };

export function AddOns({ selected, onToggle }: Props) {
  return (
    <section aria-labelledby="addons-title" className="min-w-0 space-y-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:space-y-3 sm:p-5">
      <h2 id="addons-title" className="font-bold">
        Add-ons
      </h2>
      {ADD_ONS.map((a) => {
        const on = selected.includes(a.id);
        return (
          <label
            key={a.id}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-xl p-3 ring-1 transition",
              on ? "bg-brand-50 ring-2 ring-brand-600" : "ring-line hover:ring-brand-600"
            )}
          >
            <input type="checkbox" checked={on} onChange={() => onToggle(a.id)} className="mt-1 size-4 shrink-0 accent-brand-600" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-snug">{a.label}</span>
              <span className="block text-xs text-muted">{a.note}</span>
            </span>
            <span className="shrink-0 text-right text-sm font-bold text-brand-700">
              +{rupees(a.price)}
              <span className="block text-xs font-normal text-muted">per unit</span>
            </span>
          </label>
        );
      })}
    </section>
  );
}