"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, SearchX } from "lucide-react";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { rupees } from "@/lib/format";
import { loadOrder, type Order } from "@/lib/orders";

export function OrderConfirmation({ id }: { id: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(loadOrder(id));
  }, [id]);

  if (order === undefined) {
    return <div aria-busy="true" className="h-72 animate-pulse rounded-2xl bg-white ring-1 ring-line" />;
  }

  if (order === null) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-line">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <SearchX className="size-8" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold">We could not find this order</h1>
        <p className="mt-1 text-muted">Orders are saved in the browser you placed them from.</p>
        <Link
          href="/"
          className="btn-gradient mt-6 inline-flex h-12 items-center rounded-xl px-6 font-semibold shadow-md"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const a = order.address;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check className="size-10" aria-hidden />
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">Order placed!</h1>
        <p className="mt-2 text-muted">Thank you, {a.name}. We have received your order.</p>
        <div className="mx-auto mt-6 max-w-md rounded-2xl bg-brand-50 p-5">
          <p className="text-sm font-semibold text-muted">Order number</p>
          <p className="text-3xl font-extrabold text-brand-700">{order.id}</p>
          <p className="mt-3 text-sm font-semibold">Delivery date</p>
          <p className="font-bold">{order.delivery}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
          <h2 className="text-lg font-extrabold">Delivery details</h2>
          <address className="space-y-1 text-sm not-italic text-muted">
            <p className="font-semibold text-ink">{a.name}</p>
            <p>{a.address}</p>
            <p>
              {a.city} - {a.pincode}
            </p>
            <p>{a.phone}</p>
            <p>{a.email}</p>
            {a.gstin && <p>GSTIN: {a.gstin}</p>}
          </address>
          <p className="text-sm">
            <span className="font-semibold">Payment: </span>
            {order.payment}
          </p>
          {order.note && (
            <p className="text-sm">
              <span className="font-semibold">Message card: </span>
              {order.note}
            </p>
          )}
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
          <h2 className="mb-4 text-lg font-extrabold">Order summary</h2>
          <ul className="mb-4 space-y-3 text-sm">
                         {order.lines.map((l, i) => (
              <li key={`${i}-${l.name}-${l.variant}-${l.qty}`} className="flex justify-between gap-3">
                                <span>
                  {l.name} <span className="text-muted">({l.variant}) × {l.qty}</span>
                  {l.extras && <span className="block text-xs text-muted">{l.extras}</span>}
                </span>
                <span className="font-semibold">{rupees(l.total)}</span>
              </li>
            ))}
          </ul>
          <PriceBreakdown totals={order.totals} coupon={order.coupon} />
        </section>
      </div>

      <div className="text-center">
        <Link
          href="/category/all"
          className="btn-gradient inline-flex h-12 items-center rounded-xl px-6 font-semibold shadow-md"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}