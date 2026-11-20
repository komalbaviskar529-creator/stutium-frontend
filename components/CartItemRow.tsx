"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/cart-types";
import { useCart } from "@/lib/cart-context";
import { rupees } from "@/lib/format";
import { productImage } from "@/lib/images";
import { ADD_ONS } from "@/lib/pricing";
import { QuantityStepper } from "@/components/QuantityStepper";
import { SmartImage } from "@/components/SmartImage";

export function CartItemRow({ line }: { line: CartLine }) {
  const { item, product, unit, total } = line;
  const { setQty, removeItem } = useCart();
  const extras = ADD_ONS.filter((a) => item.addOns.includes(a.id)).map((a) => a.label);

  return (
    <li className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:gap-6 sm:p-5">
      <Link
        href={`/products/${product.slug}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl sm:size-28"
      >
        <SmartImage src={productImage(product.slug)} alt={product.name} sizes="112px" seed={product.slug} />
      </Link>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} className="text-lg font-bold hover:text-brand-700">
              {product.name}
            </Link>
            <p className="text-sm text-muted">
              {product.variants[item.variantIndex]} · {rupees(unit)} each
            </p>
          </div>
          <p className="text-lg font-extrabold">{rupees(total)}</p>
        </div>

        {extras.length > 0 && <p className="text-sm text-muted">Add-ons: {extras.join(", ")}</p>}

        {(item.artwork || item.text) && (
          <div className="flex items-center gap-3 text-sm text-muted">
            {item.artwork && (
              <span className="relative size-10 shrink-0 overflow-hidden rounded-md bg-surface ring-1 ring-line">
                <Image src={item.artwork} alt="Your uploaded logo" fill unoptimized className="object-contain p-0.5" />
              </span>
            )}
            <span>
              {item.artworkName && <span>Logo: {item.artworkName}</span>}
              {item.artworkName && item.text && " · "}
              {item.text && <span>Text: {item.text}</span>}
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantityStepper
            compact
            value={item.qty}
            min={product.moq}
            onChange={(n) => setQty(item.id, n)}
            label={`Quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-danger focus-visible:outline-2 focus-visible:outline-brand-600"
          >
            <Trash2 className="size-4" aria-hidden />
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}