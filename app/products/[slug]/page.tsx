 import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductView } from "@/components/ProductView";
import { PRODUCT_COPY } from "@/lib/product-copy";
import { getAllProducts, getCategory, getProductBySlug, getRelatedProducts } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} | Stutium` : "Product | Stutium" };
}

function InfoBox({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-6">
      <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted sm:mt-4 sm:text-base">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="text-brand-600">•</span>
            {i}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const copy = PRODUCT_COPY[product.category] ?? PRODUCT_COPY["corporate-gifts"];
  const related = getRelatedProducts(product, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pb-28 pt-4 sm:space-y-12 sm:pt-8 lg:pb-8">
      <nav aria-label="Breadcrumb" className="text-xs text-muted sm:text-sm">
        <Link href="/" className="hover:underline">Home</Link> ›{" "}
        <Link href={`/category/${product.category}`} className="hover:underline">
          {category?.name ?? "Category"}
        </Link>{" "}
        › <span className="text-ink">{product.name}</span>
      </nav>

      <ProductView product={product} />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <InfoBox title="Product details" items={copy.details} />
        <InfoBox title="Care instructions" items={copy.care} />
      </div>

      <section aria-labelledby="related">
        <h2 id="related" className="mb-4 text-xl font-extrabold tracking-tight sm:mb-6 sm:text-2xl">
          You may also like
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}