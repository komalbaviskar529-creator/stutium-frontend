import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/ProductView";
import { PRODUCT_COPY } from "@/lib/product-copy";
import { getAllProducts, getCategory, getProductBySlug } from "@/lib/products";

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
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <ul className="mt-4 space-y-2 text-muted">
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

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="hover:underline">Home</Link> ›{" "}
        <Link href={`/category/${product.category}`} className="hover:underline">
          {category?.name ?? "Category"}
        </Link>{" "}
        › <span className="text-ink">{product.name}</span>
      </nav>

      <ProductView product={product} />

      <div className="grid gap-6 md:grid-cols-2">
        <InfoBox title="Product details" items={copy.details} />
        <InfoBox title="Care instructions" items={copy.care} />
      </div>
    </div>
  );
}