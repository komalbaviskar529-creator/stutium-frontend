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
    <section aria-labelledby="upsell-title" className="min-w-0">
      <h2 id="upsell-title" className="mb-3 text-lg font-extrabold sm:mb-4 sm:text-xl">
        Add these too
      </h2>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
        {picks.map((p) => (
          <div
            key={p.id}
            className="flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line sm:w-auto"
          >
            <div className="relative aspect-[4/3]">
              <SmartImage src={productImage(p.slug)} alt={p.name} sizes="(min-width: 640px) 220px, 176px" seed={p.slug} />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-bold sm:text-base">{p.name}</p>
                <p className="text-xs text-muted sm:text-sm">From {rupees(unitPrice(p, 0, p.moq))} each</p>
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