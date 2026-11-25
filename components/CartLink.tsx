 "use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartLink() {
  const { count, ready } = useCart();
  const n = ready ? count : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${n} items`}
      className="relative flex flex-col items-center gap-0.5 p-2 text-xs font-medium hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600 sm:p-0"
    >
      <ShoppingBag className="size-6" aria-hidden />
      <span className="hidden sm:inline">Cart</span>
      <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white sm:-right-2.5 sm:-top-1">
        {n}
      </span>
    </Link>
  );
}