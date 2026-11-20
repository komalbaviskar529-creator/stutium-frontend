"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { computeTotals, resolveLines } from "@/lib/pricing";
import { CartItemRow } from "@/components/CartItemRow";
import { CouponBox } from "@/components/CouponBox";
import { MessageCardBox } from "@/components/MessageCardBox";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { UpsellRow } from "@/components/UpsellRow";

export function CartView() {
  const { items, ready, coupon } = useCart();
  const lines = useMemo(() => resolveLines(items), [items]);
  const totals = computeTotals(lines, coupon);

  if (!ready) {
    return <div aria-busy="true" className="h-72 animate-pulse rounded-2xl bg-white ring-1 ring-line" />;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-line">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <ShoppingBag className="size-8" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-1 text-muted">Browse our categories and add something to your cart.</p>
        <Link
          href="/category/all"
          className="btn-gradient mt-6 inline-flex h-12 items-center rounded-xl px-6 font-semibold shadow-md"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">
        Your Cart{" "}
        <span className="text-lg font-semibold text-muted">
          ({lines.length} {lines.length === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <ul className="space-y-4">
            {lines.map((l) => (
              <CartItemRow key={l.item.id} line={l} />
            ))}
          </ul>
          <MessageCardBox />
          <UpsellRow />
        </div>

        <aside className="space-y-4 self-start lg:sticky lg:top-28">
          <CouponBox />
          <section aria-labelledby="price-details" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line">
            <h2 id="price-details" className="mb-4 text-lg font-extrabold">
              Price details
            </h2>
            <PriceBreakdown totals={totals} coupon={coupon} />
            <Link
              href="/checkout"
              className="btn-gradient mt-5 flex h-12 items-center justify-center rounded-xl font-semibold shadow-md"
            >
              Proceed to checkout
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}