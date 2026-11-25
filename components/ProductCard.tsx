 import Link from "next/link";
import { Star, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { rupees } from "@/lib/format";
import { productImage } from "@/lib/images";
import { SmartImage } from "@/components/SmartImage";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:rounded-2xl"
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-line transition group-hover:-translate-y-1 group-hover:shadow-xl sm:rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <SmartImage
            src={productImage(product.slug)}
            alt={product.name}
            sizes="(min-width: 1024px) 25vw, 50vw"
            seed={product.slug}
            className="transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-brand-700 shadow sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
            {off}% OFF
          </span>
        </div>
        <div className="space-y-1 p-2.5 sm:space-y-2 sm:p-4">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug sm:text-base">{product.name}</h3>
          <p className="flex items-center gap-1 text-xs text-muted sm:text-sm">
            <Star className="size-3.5 fill-amber-400 text-amber-400 sm:size-4" aria-hidden />
            <span className="font-semibold text-ink">{product.rating}</span>({product.reviews})
          </p>
          <p className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-base font-extrabold sm:text-xl">{rupees(product.price)}</span>
            <span className="text-xs text-muted line-through sm:text-sm">{rupees(product.mrp)}</span>
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700 sm:px-3 sm:py-1 sm:text-xs">
            <Truck className="size-3 sm:size-3.5" aria-hidden />
            {product.delivery}
          </span>
        </div>
      </div>
    </Link>
  );
}