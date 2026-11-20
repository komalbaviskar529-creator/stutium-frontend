"use client";

import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { rupees } from "@/lib/format";
import { productImage } from "@/lib/images";
import { unitPrice } from "@/lib/pricing";
import { getProductBySlug } from "@/lib/products";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/Button";

const SLUGS = ["custom-notebook", "greeting-card-pack", "sticker-sheet", "custom-poster-a3"];

export function UpsellRow() {
  const { items, addItem } = useCart();
  const inCart = new Set(items.map((i) => i.slug));
  const picks = SLUGS.map((s) => getProductBySlug(s))
    .filter((p): p is Product => !!p && !inCart.has(p.slug))
    .slice(0, 3);

  if (picks.length === 0) return null;

  return (
    <section aria-labelledby="upsell-title">
      <h2 id="upsell-title" className="mb-4 text-xl font-extrabold">
        Add these too
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {picks.map((p) => (
          <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line">
            <div className="relative aspect-[4/3]">
              <SmartImage src={productImage(p.slug)} alt={p.name} sizes="(min-width: 640px) 220px, 100vw" seed={p.slug} />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-sm text-muted">From {rupees(unitPrice(p, 0, p.moq))} each</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="mt-auto gap-1"
                onClick={() =>
                  addItem({
                    slug: p.slug,
                    variantIndex: 0,
                    qty: p.moq,
                    addOns: [],
                    text: "",
                    artwork: "",
                    artworkName: "",
                  })
                }
              >
                <Plus className="size-4" aria-hidden />
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}