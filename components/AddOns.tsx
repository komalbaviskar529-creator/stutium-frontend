import { cn } from "@/lib/cn";
import { rupees } from "@/lib/format";
import { ADD_ONS } from "@/lib/pricing";

type Props = { selected: string[]; onToggle: (id: string) => void };

export function AddOns({ selected, onToggle }: Props) {
  return (
    <section aria-labelledby="addons-title" className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line">
      <h2 id="addons-title" className="font-bold">
        Add-ons
      </h2>
      {ADD_ONS.map((a) => {
        const on = selected.includes(a.id);
        return (
          <label
            key={a.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-xl p-3 ring-1 transition",
              on ? "bg-brand-50 ring-2 ring-brand-600" : "ring-line hover:ring-brand-600"
            )}
          >
            <input type="checkbox" checked={on} onChange={() => onToggle(a.id)} className="size-4 accent-brand-600" />
            <span className="flex-1">
              <span className="block font-semibold">{a.label}</span>
              <span className="block text-xs text-muted">{a.note}</span>
            </span>
            <span className="text-sm font-bold text-brand-700">
              +{rupees(a.price)} <span className="font-normal text-muted">/ unit</span>
            </span>
          </label>
        );
      })}
    </section>
  );
}