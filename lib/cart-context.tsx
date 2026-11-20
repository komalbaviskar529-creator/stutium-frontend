"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, NewCartItem } from "@/lib/cart-types";
import { couponRate } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/products";

const CART_KEY = "stutium-cart";
const COUPON_KEY = "stutium-coupon";
const NOTE_KEY = "stutium-note";
const MAX_QTY = 10000;

type CouponResult = { ok: boolean; message: string };

type CartCtx = {
  items: CartItem[];
  count: number;
  ready: boolean;
  coupon: string;
  note: string | null;
  addItem: (item: NewCartItem) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => CouponResult;
  removeCoupon: () => void;
  setNote: (note: string | null) => void;
};

const CartContext = createContext<CartCtx | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

const makeId = (i: NewCartItem) =>
  [i.slug, i.variantIndex, [...i.addOns].sort().join("+"), i.text, i.artworkName].join("|");

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = read<unknown>(CART_KEY, []);
    setItems(Array.isArray(saved) ? (saved as CartItem[]) : []);
    setCoupon(read<string>(COUPON_KEY, ""));
    setNote(read<string | null>(NOTE_KEY, null));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    // If the browser storage is full (large logo files), save the cart without the logo images.
    if (!save(CART_KEY, items)) save(CART_KEY, items.map((i) => ({ ...i, artwork: "" })));
  }, [items, ready]);

  useEffect(() => {
    if (!ready) return;
    save(COUPON_KEY, coupon);
    save(NOTE_KEY, note);
  }, [coupon, note, ready]);

  const addItem = useCallback((input: NewCartItem) => {
    const id = makeId(input);
    setItems((prev) => {
      if (prev.some((i) => i.id === id)) {
        return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + input.qty, MAX_QTY) } : i));
      }
      return [...prev, { ...input, id }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const min = getProductBySlug(i.slug)?.moq ?? 1;
        return { ...i, qty: Math.min(Math.max(qty, min), MAX_QTY) };
      })
    );
  }, []);

  const removeItem = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => {
    setItems([]);
    setCoupon("");
    setNote(null);
  }, []);

  const applyCoupon = useCallback((code: string): CouponResult => {
    const c = code.trim().toUpperCase();
    if (!c) return { ok: false, message: "Enter a coupon code" };
    if (couponRate(c) === 0) return { ok: false, message: "This coupon code is not valid" };
    setCoupon(c);
    return { ok: true, message: `Coupon ${c} applied` };
  }, []);

  const removeCoupon = useCallback(() => setCoupon(""), []);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      count: items.length,
      ready,
      coupon,
      note,
      addItem,
      setQty,
      removeItem,
      clear,
      applyCoupon,
      removeCoupon,
      setNote,
    }),
    [items, ready, coupon, note, addItem, setQty, removeItem, clear, applyCoupon, removeCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}