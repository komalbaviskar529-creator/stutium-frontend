 "use client";

import { useMemo } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { rupeesExact } from "@/lib/format";
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
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-line sm:p-12">
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
    <div className="pb-24 lg:pb-0">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        Your Cart{" "}
        <span className="text-base font-semibold text-muted sm:text-lg">
          ({lines.length} {lines.length === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:mt-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
        <div className="min-w-0 space-y-6 sm:space-y-8">
          <ul className="space-y-3 sm:space-y-4">
            {lines.map((l) => (
              <CartItemRow key={l.item.id} line={l} />
            ))}
          </ul>
          <MessageCardBox />
          <UpsellRow />
        </div>

        <aside className="min-w-0 space-y-4 self-start lg:sticky lg:top-28">
          <CouponBox />
          <section aria-labelledby="price-details" className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5">
            <h2 id="price-details" className="mb-4 text-lg font-extrabold">
              Price details
            </h2>
            <PriceBreakdown totals={totals} coupon={coupon} />
            <Link
              href="/checkout"
              className="btn-gradient mt-5 hidden h-12 items-center justify-center rounded-xl font-semibold shadow-md lg:flex"
            >
              Proceed to checkout
            </Link>
          </section>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-white px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="min-w-0">
          <p className="text-xs text-muted">Total</p>
          <p className="truncate text-lg font-extrabold">{rupeesExact(totals.total)}</p>
        </div>
        <Link
          href="/checkout"
          className="btn-gradient inline-flex h-11 shrink-0 items-center rounded-xl px-6 text-sm font-semibold shadow-md"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}