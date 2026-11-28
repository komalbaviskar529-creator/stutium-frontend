 import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = { title: "Cart | Stutium" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8">
      <CartView />
    </div>
  );
}