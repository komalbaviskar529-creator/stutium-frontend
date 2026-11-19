"use client";

import { useState } from "react";
import { Star, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import type { Slot } from "@/lib/delivery";
import { rupees } from "@/lib/format";
import { subtotal, unitPrice, variantMultiplier } from "@/lib/pricing";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/Gallery";
import { PincodeCheck } from "@/components/PincodeCheck";
import { PriceTiers } from "@/components/PriceTiers";
import { QuantityStepper } from "@/components/QuantityStepper";
import { VariantSelector } from "@/components/VariantSelector";

export function ProductView({ product }: { product: Product }) {
  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(product.moq);
  const [slot, setSlot] = useState<Slot | null>(null);

  const unit = unitPrice(product, variant, qty);
  const mrp = Math.round(product.mrp * variantMultiplier(variant));
  const off = Math.max(0, Math.round((1 - unit / mrp) * 100));

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="self-start lg:sticky lg:top-28">
        <Gallery name={product.name} slug={product.slug} />
      </div>

      <div className="space-y-6">
        <div>
          <Badge variant="brand">
            <Truck className="size-3.5" aria-hidden />
            {product.delivery}
          </Badge>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{product.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-sm text-muted">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-semibold text-ink">{product.rating}</span>({product.reviews} reviews)
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line" aria-live="polite">
          <p className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-extrabold">{rupees(unit)}</span>
            <span className="text-lg text-muted line-through">{rupees(mrp)}</span>
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">{off}% OFF</span>
          </p>
          <p className="mt-1 text-sm text-muted">per unit · minimum order {product.moq}</p>
        </div>

        <VariantSelector variants={product.variants} selected={variant} onSelect={setVariant} />
        <QuantityStepper value={qty} min={product.moq} onChange={setQty} />
        <PriceTiers product={product} variantIndex={variant} qty={qty} onSelect={setQty} />

        <div className="flex items-center justify-between rounded-2xl bg-brand-50 p-5" aria-live="polite">
          <p className="text-sm font-semibold">
            Subtotal ({qty} × {rupees(unit)})
          </p>
          <p className="text-2xl font-extrabold text-brand-700">{rupees(subtotal(product, variant, qty))}</p>
        </div>

        <PincodeCheck deliveryDays={product.deliveryDays} slot={slot} onSlot={setSlot} />
      </div>
    </div>
  );
}