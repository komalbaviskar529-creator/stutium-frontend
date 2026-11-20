import type { Totals } from "@/lib/cart-types";
import type { AddressValues } from "@/lib/validation";

 export type OrderLine = { name: string; variant: string; qty: number; unit: number; total: number; extras?: string };

export type Order = {
  id: string;
  createdAt: string;
  address: AddressValues;
  delivery: string;
  payment: string;
  lines: OrderLine[];
  totals: Totals;
  coupon: string;
  note: string;
};

export const PAYMENT_LABELS: Record<string, string> = {
  upi: "UPI",
  card: "Credit / Debit card",
  netbanking: "Net banking",
  cod: "Cash on delivery",
};

const KEY = "stutium-orders";

export const newOrderId = () => `STU-${Math.floor(10000 + Math.random() * 90000)}`;

function readAll(): Record<string, Order> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, Order>;
  } catch {
    return {};
  }
}

export function saveOrder(order: Order) {
  try {
    const all = readAll();
    all[order.id] = order;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // storage may be blocked; the confirmation page then shows "order not found"
  }
}

export const loadOrder = (id: string): Order | null => readAll()[id] ?? null;