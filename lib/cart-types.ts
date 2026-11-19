import type { Product } from "@/lib/types";

export type CartItem = {
  id: string;
  slug: string;
  variantIndex: number;
  qty: number;
  addOns: string[];
  text: string;
  artwork: string;
  artworkName: string;
};

export type NewCartItem = Omit<CartItem, "id">;

export type CartLine = { item: CartItem; product: Product; unit: number; total: number };

export type Totals = {
  subtotal: number;
  discount: number;
  delivery: number;
  gst: number;
  total: number;
};