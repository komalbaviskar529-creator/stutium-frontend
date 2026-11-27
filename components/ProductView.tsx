 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ShoppingBag, Star, Truck, Zap } from "lucide-react";
import type { NewCartItem } from "@/lib/cart-types";
import type { Slot } from "@/lib/delivery";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { rupees } from "@/lib/format";
import { addOnsPerUnit, unitPrice, variantMultiplier } from "@/lib/pricing";
import { AddOns } from "@/components/AddOns";
import { Gallery } from "@/components/Gallery";
import { LogoOverlay } from "@/components/LogoOverlay";
import { PincodeCheck } from "@/components/PincodeCheck";
import { PriceTiers } from "@/components/PriceTiers";
import { QuantityStepper } from "@/components/QuantityStepper";
import { UploadPreview, type Artwork } from "@/components/UploadPreview";
import { VariantSelector } from "@/components/VariantSelector";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProductView({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [variant, setVariant] = useState(0);
  const [qty, setQty] = useState(product.moq);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [text, setText] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setAdded(false);
  }, [variant, qty, addOns, text, artwork]);

  const unit = unitPrice(product, variant, qty);
  const extras = addOnsPerUnit(addOns);
  const perUnit = unit + extras;
  const total = perUnit * qty;
  const mrp = Math.round(product.mrp * variantMultiplier(variant));
  const off = Math.max(0, Math.round((1 - unit / mrp) * 100));

  const toggleAddOn = (id: string) =>
    setAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  function buildItem(): NewCartItem {
    return {
      slug: product.slug,
      variantIndex: variant,
      qty,
      addOns: [...addOns].sort(),
      text: text.trim(),
      artwork: artwork?.dataUrl ?? "",
      artworkName: artwork?.name ?? "",
    };
  }

  function add() {
    addItem(buildItem());
    setAdded(true);
  }

  function buyNow() {
    if (!added) addItem(buildItem());
    router.push("/checkout");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="min-w-0 self-start lg:sticky lg:top-28">
        <Gallery name={product.name} slug={product.slug} overlay={<LogoOverlay artwork={artwork} text={text} />} />
      </div>

      <div className="min-w-0 space-y-4 sm:space-y-6">
        <div>
          <Badge variant="brand">
            <Truck className="size-3.5" aria-hidden />
            {product.delivery}
          </Badge>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted sm:mt-2">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-semibold text-ink">{product.rating}</span>({product.reviews} reviews)
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5" aria-live="polite">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-extrabold sm:text-4xl">{rupees(unit)}</span>
            <span className="text-base text-muted line-through sm:text-lg">{rupees(mrp)}</span>
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">{off}% OFF</span>
          </p>
          <p className="mt-1 text-sm text-muted">per unit · minimum order {product.moq}</p>
        </div>

        <VariantSelector variants={product.variants} selected={variant} onSelect={setVariant} />
        <QuantityStepper value={qty} min={product.moq} onChange={setQty} />
        <PriceTiers product={product} variantIndex={variant} qty={qty} onSelect={setQty} />

        <PincodeCheck deliveryDays={product.deliveryDays} slot={slot} onSlot={setSlot} />

        <UploadPreview artwork={artwork} text={text} onArtwork={setArtwork} onText={setText} />
        <AddOns selected={addOns} onToggle={toggleAddOn} />

        <div className="space-y-3 rounded-2xl bg-brand-50 p-4 sm:space-y-4 sm:p-5">
          <div className="flex items-end justify-between gap-3" aria-live="polite">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Total (before GST)</p>
              <p className="text-xs text-muted">
                {qty} × {rupees(perUnit)}
                {extras > 0 ? ` (includes ${rupees(extras)} add-ons per unit)` : ""}
              </p>
            </div>
            <p className="shrink-0 text-2xl font-extrabold text-brand-700 sm:text-3xl">{rupees(total)}</p>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            {added && (
              <p role="status" className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-700">
                <Check className="size-4" aria-hidden />
                Added to cart.
                <Link href="/cart" className="underline">
                  View cart
                </Link>
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Button size="lg" onClick={add} className="gap-2 px-3">
                <ShoppingBag className="size-5" aria-hidden />
                Add to cart
              </Button>
              <Button size="lg" variant="secondary" onClick={buyNow} className="gap-2 px-3">
                <Zap className="size-5" aria-hidden />
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}