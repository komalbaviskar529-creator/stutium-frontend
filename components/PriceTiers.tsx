import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";
import { rupees } from "@/lib/format";
import { tierFor, variantMultiplier } from "@/lib/pricing";

type Props = { product: Product; variantIndex: number; qty: number; onSelect: (qty: number) => void };

export function PriceTiers({ product, variantIndex, qty, onSelect }: Props) {
  const tiers = [...product.tiers].sort((a, b) => a.min - b.min);
  const current = tierFor(product, qty);
  const mult = variantMultiplier(variantIndex);

  return (
    <div>
      <p className="mb-2 text-sm font-bold">Bulk pricing</p>
      <div className="grid grid-cols-3 gap-3">
        {tiers.map((t, i) => {
          const next = tiers[i + 1];
          const range = next ? `${t.min}-${next.min - 1}` : `${t.min}+`;
          const active = t.min === current.min;
          const save = i > 0 ? Math.round((1 - t.price / tiers[0].price) * 100) : 0;
          return (
            <button
              key={t.min}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(t.min)}
              className={cn(
                "rounded-xl p-3 text-left ring-1 transition focus-visible:outline-2 focus-visible:outline-brand-600",
                active ? "bg-brand-50 ring-2 ring-brand-600" : "bg-white ring-line hover:ring-brand-600"
              )}
            >
              <span className="block text-xs font-semibold text-muted">{range} units</span>
              <span className="block text-lg font-extrabold">{rupees(Math.round(t.price * mult))}</span>
              <span className="block text-xs font-semibold text-green-700">{save > 0 ? `Save ${save}%` : "each"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
