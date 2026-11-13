import Link from "next/link";
import type { Product } from "@/lib/types";
import { rupees } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <Card className="overflow-hidden transition-shadow group-hover:shadow-md">
        <ImagePlaceholder label={product.name} className="aspect-[4/3]" />
        <div className="space-y-1 p-3">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted">
            ★ {product.rating} ({product.reviews})
          </p>
          <p>
            <span className="font-bold">{rupees(product.price)}</span>{" "}
            <span className="text-sm text-muted line-through">{rupees(product.mrp)}</span>
          </p>
          <Badge variant="brand">{product.delivery}</Badge>
        </div>
      </Card>
    </Link>
  );
}