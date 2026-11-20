"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Banknote, CreditCard, Landmark, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import { AddressForm } from "@/components/AddressForm";
import { CheckoutProgress } from "@/components/CheckoutProgress";
import { DeliverySlots } from "@/components/DeliverySlots";
import { PriceBreakdown } from "@/components/PriceBreakdown";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";
import { getDeliverySlots, lookupPincode, slotText, type Slot } from "@/lib/delivery";
import { rupees, rupeesExact } from "@/lib/format";
import { PAYMENT_LABELS, newOrderId, saveOrder, type Order } from "@/lib/orders";
import { usePincode } from "@/lib/pincode-context";
 import { ADD_ONS, computeTotals, resolveLines } from "@/lib/pricing";
import type { AddressValues } from "@/lib/validation";

const PAYMENTS: { id: string; note: string; icon: LucideIcon }[] = [
  { id: "upi", note: "Pay with any UPI app", icon: Smartphone },
  { id: "card", note: "Visa, Mastercard, RuPay", icon: CreditCard },
  { id: "netbanking", note: "All major banks", icon: Landmark },
  { id: "cod", note: "Pay when your order arrives", icon: Banknote },
];

export function CheckoutView() {
  const router = useRouter();
  const { items, ready, coupon, note, clear } = useCart();
  const { pincode } = usePincode();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [address, setAddress] = useState<AddressValues | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const lines = useMemo(() => resolveLines(items), [items]);
  const info = address ? lookupPincode(address.pincode) : null;
  const slowest = lines.reduce((m, l) => Math.max(m, l.product.deliveryDays), 0);
  const slots = useMemo(() => (info ? getDeliverySlots(info, slowest) : []), [info, slowest]);
  const totals = computeTotals(lines, coupon, slot?.fee ?? 0);

  const blank: AddressValues = { name: "", phone: "", email: "", address: "", pincode, city: "", gstin: "" };

  function onAddress(values: AddressValues) {
    setAddress({ ...values, gstin: values.gstin.toUpperCase() });
    setSlot(null);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pay() {
    if (!address || !slot || placing) return;
    setPlacing(true);
    const order: Order = {
      id: newOrderId(),
      createdAt: new Date().toISOString(),
      address,
      delivery: slotText(slot),
      payment: PAYMENT_LABELS[payment] ?? payment,
      lines: lines.map((l) => ({
        name: l.product.name,
        variant: l.product.variants[l.item.variantIndex] ?? "",
        qty: l.item.qty,
        unit: l.unit,
        total: l.total,
                extras: ADD_ONS.filter((a) => l.item.addOns.includes(a.id)).map((a) => a.label).join(", "),
      })),
      totals,
      coupon,
      note: note ?? "",
    };
    window.setTimeout(() => {
      saveOrder(order);
      clear();
      router.push(`/order/${order.id}`);
    }, 900);
  }

  if (!ready || placing) {
    return (
      <div aria-busy="true" className="space-y-3 text-center">
        <div className="h-72 animate-pulse rounded-2xl bg-white ring-1 ring-line" />
        {placing && <p className="font-semibold text-muted">Placing your order...</p>}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-line">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <ShoppingBag className="size-8" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-1 text-muted">Add something to your cart before checking out.</p>
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
    <div className="space-y-8">
      <h1 className="sr-only">Checkout</h1>
      <CheckoutProgress step={step} />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          {step === 1 && <AddressForm defaultValues={address ?? blank} onSubmit={onAddress} />}

          {step === 2 && (
            <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
              <h2 className="text-xl font-extrabold">Choose your delivery date</h2>
              {info && (
                <p className="text-sm text-muted">
                  Delivering to {info.city}, {info.state}. Express delivery costs {rupees(149)} extra.
                </p>
              )}
              <DeliverySlots slots={slots} selectedId={slot?.id} onSelect={setSlot} />
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" size="lg" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="size-4" aria-hidden />
                  Back
                </Button>
                <Button type="button" size="lg" disabled={!slot} onClick={() => setStep(3)}>
                  Continue to payment
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
              <h2 className="text-xl font-extrabold">Payment method</h2>
              <fieldset className="space-y-3">
                <legend className="sr-only">Payment method</legend>
                {PAYMENTS.map((p) => {
                  const Icon = p.icon;
                  const on = payment === p.id;
                  return (
                    <label
                      key={p.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl p-4 ring-1 transition",
                        on ? "bg-brand-50 ring-2 ring-brand-600" : "bg-white ring-line hover:ring-brand-600"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={p.id}
                        checked={on}
                        onChange={() => setPayment(p.id)}
                        className="size-4 accent-brand-600"
                      />
                      <Icon className="size-6 text-brand-600" aria-hidden />
                      <span>
                        <span className="block font-bold">{PAYMENT_LABELS[p.id]}</span>
                        <span className="block text-sm text-muted">{p.note}</span>
                      </span>
                    </label>
                  );
                })}
              </fieldset>
              <p className="text-xs text-muted">This is a demo store. No real payment is taken.</p>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="secondary" size="lg" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="size-4" aria-hidden />
                  Back
                </Button>
                <Button type="button" size="lg" onClick={pay}>
                  {payment === "cod" ? "Place order" : `Pay ${rupeesExact(totals.total)}`}
                </Button>
              </div>
            </section>
          )}
        </div>

        <aside className="self-start rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line lg:sticky lg:top-28">
          <h2 className="mb-4 text-lg font-extrabold">Order summary</h2>
          <ul className="mb-4 space-y-3 text-sm">
            {lines.map((l) => (
              <li key={l.item.id} className="flex justify-between gap-3">
                <span>
                  {l.product.name} <span className="text-muted">× {l.item.qty}</span>
                </span>
                <span className="font-semibold">{rupees(l.total)}</span>
              </li>
            ))}
          </ul>
          <PriceBreakdown totals={totals} coupon={coupon} />
          <Link href="/cart" className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline">
            Edit cart
          </Link>
        </aside>
      </div>
    </div>
  );
}