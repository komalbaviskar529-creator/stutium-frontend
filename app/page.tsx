 import Link from "next/link";
import { BannerCarousel } from "@/components/BannerCarousel";
import { CircleLink } from "@/components/CircleLink";
import { ProductCard } from "@/components/ProductCard";
import { getBestsellers } from "@/lib/products";
import { OCCASIONS } from "@/lib/occasions";

const shopCategories = [
  { label: "Mugs", href: "/category/corporate-gifts?sub=mugs" },
  { label: "Pens", href: "/category/corporate-gifts?sub=pens" },
  { label: "Bottles", href: "/category/corporate-gifts?sub=bottles" },
  { label: "Calendars", href: "/category/calendars-diaries?sub=wall-calendars" },
  { label: "Diaries", href: "/category/calendars-diaries?sub=diaries" },
  { label: "Posters", href: "/category/print-on-demand?sub=posters" },
];

const giftingFor = ["Employees", "Clients", "Team", "Family", "Friends", "Events"];
const trust = ["Bulk pricing", "Free message card", "Delivery across India", "Secure payment"];

export default function Home() {
  const bestsellers = getBestsellers(4);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-6">
      <BannerCarousel />

      <section aria-labelledby="shop-category">
        <h2 id="shop-category" className="mb-4 text-xl font-bold">Shop by Category</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 sm:gap-8">
          {shopCategories.map((c) => (
            <CircleLink key={c.label} label={c.label} href={c.href} />
          ))}
        </div>
      </section>

      <section aria-labelledby="shop-occasion">
        <h2 id="shop-occasion" className="mb-4 text-xl font-bold">Shop by Occasion</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {OCCASIONS.map((o) => (
            <Link
              key={o.slug}
              href={`/category/all?occasion=${o.slug}`}
              className="flex h-28 items-end rounded-xl bg-surface p-4 font-semibold hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="bestsellers">
        <h2 id="bestsellers" className="mb-4 text-xl font-bold">Bestsellers</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="gifting-for">
        <h2 id="gifting-for" className="mb-4 text-xl font-bold">Gifting For</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 sm:gap-8">
          {giftingFor.map((g) => (
            <CircleLink key={g} label={g} href="/category/all" />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-brand-50 p-8 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Add your logo. Personalise your gift.</h2>
        <Link
          href="/category/all?personalised=yes"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Personalise now
        </Link>
      </section>

      <section aria-label="Why Stutium" className="grid grid-cols-2 gap-4 rounded-xl border border-line p-4 text-center text-sm font-semibold sm:grid-cols-4">
        {trust.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </section>
    </div>
  );
}