
import type { Product, Tier } from "@/lib/types";

export function tierFor(product: Product, qty: number): Tier {
  const sorted = [...product.tiers].sort((a, b) => a.min - b.min);
  let current = sorted[0];
  for (const t of sorted) if (qty >= t.min) current = t;
  return current;
}

// Mock rule: each later option costs 10% more than the one before it.
export const variantMultiplier = (variantIndex: number) => 1 + variantIndex * 0.1;

export const unitPrice = (product: Product, variantIndex: number, qty: number) =>
  Math.round(tierFor(product, qty).price * variantMultiplier(variantIndex));

export const subtotal = (product: Product, variantIndex: number, qty: number) =>
  unitPrice(product, variantIndex, qty) * qty;