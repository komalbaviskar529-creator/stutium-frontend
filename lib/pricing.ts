 import type { CartItem, CartLine, Totals } from "@/lib/cart-types";
import type { Product, Tier } from "@/lib/types";
import { getProductBySlug } from "@/lib/products";

export const GST_RATE = 0.18;

export const ADD_ONS = [
  { id: "gift-box", label: "Gift box", price: 99, note: "Rigid box with ribbon" },
  { id: "greeting-card", label: "Premium greeting card", price: 29, note: "Printed with your message" },
  { id: "gift-wrap", label: "Gift wrap", price: 49, note: "Wrapped and tied" },
];

export const COUPONS: Record<string, number> = { BULK10: 0.1 };
export const couponRate = (code: string) => COUPONS[code.trim().toUpperCase()] ?? 0;

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

export const addOnsPerUnit = (ids: string[]) =>
  ADD_ONS.filter((a) => ids.includes(a.id)).reduce((sum, a) => sum + a.price, 0);

const money = (n: number) => Math.round(n * 100) / 100;

export function resolveLines(items: CartItem[]): CartLine[] {
  const lines: CartLine[] = [];
  for (const item of items) {
    const product = getProductBySlug(item.slug);
    if (!product) continue;
    const unit = unitPrice(product, item.variantIndex, item.qty) + addOnsPerUnit(item.addOns);
    lines.push({ item, product, unit, total: unit * item.qty });
  }
  return lines;
}

export function computeTotals(lines: CartLine[], couponCode: string, deliveryFee = 0): Totals {
  const subtotalValue = lines.reduce((sum, l) => sum + l.total, 0);
  const discount = money(subtotalValue * couponRate(couponCode));
  const taxable = subtotalValue - discount + deliveryFee;
  const gst = money(taxable * GST_RATE);
  return { subtotal: subtotalValue, discount, delivery: deliveryFee, gst, total: money(taxable + gst) };
}