 import Link from "next/link";
import { Star, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { rupees } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative">
          <ImagePlaceholder label={product.name} className="aspect-[4/3]" />
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-brand-700 shadow">
            {off}% OFF
          </span>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="text-base font-bold leading-snug">{product.name}</h3>
          <p className="flex items-center gap-1 text-sm text-muted">
            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-semibold text-ink">{product.rating}</span>({product.reviews})
          </p>
          <p className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold">{rupees(product.price)}</span>
            <span className="text-sm text-muted line-through">{rupees(product.mrp)}</span>
          </p>
          <Badge variant="brand">
            <Truck className="size-3.5" aria-hidden />
            {product.delivery}
          </Badge>
        </div>
      </div>
    </Link>
  );
}