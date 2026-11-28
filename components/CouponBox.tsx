 "use client";

import { useState, type FormEvent } from "react";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/lib/cart-context";

export function CouponBox() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const r = applyCoupon(code);
    setResult(r);
    if (r.ok) setCode("");
  }

  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5">
      <h2 className="mb-3 flex items-center gap-2 font-bold">
        <Tag className="size-5 text-brand-600" aria-hidden />
        Apply coupon
      </h2>

      {coupon ? (
        <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          <span>{coupon} applied</span>
          <button
            type="button"
            aria-label="Remove coupon"
            onClick={() => {
              removeCoupon();
              setResult(null);
            }}
            className="rounded-full p-1 hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ) : (
        <>
          <form onSubmit={submit} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <Input
                name="coupon"
                aria-label="Coupon code"
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                error={result && !result.ok ? result.message : undefined}
              />
            </div>
            <Button type="submit" size="lg" className="h-11 shrink-0 px-4">
              Apply
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted">Try BULK10 for 10% off.</p>
        </>
      )}
    </div>
  );
}