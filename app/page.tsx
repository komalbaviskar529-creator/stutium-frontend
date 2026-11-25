 import Link from "next/link";
import { ArrowRight, Gift, ShieldCheck, Tag, Truck } from "lucide-react";
import { BannerCarousel } from "@/components/BannerCarousel";
import { CollectionCard } from "@/components/CollectionCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SmartImage } from "@/components/SmartImage";
import { getBestsellers } from "@/lib/products";
import { OCCASIONS } from "@/lib/occasions";
import { SUB_CATEGORY_IMAGE, giftingImage, occasionImage } from "@/lib/images";

const shopCategories = [
  { label: "Mugs", href: "/category/corporate-gifts?sub=mugs", image: SUB_CATEGORY_IMAGE.mugs },
  { label: "Pens", href: "/category/corporate-gifts?sub=pens", image: SUB_CATEGORY_IMAGE.pens },
  { label: "Bottles", href: "/category/corporate-gifts?sub=bottles", image: SUB_CATEGORY_IMAGE.bottles },
  { label: "Calendars", href: "/category/calendars-diaries?sub=wall-calendars", image: SUB_CATEGORY_IMAGE["wall-calendars"] },
  { label: "Diaries", href: "/category/calendars-diaries?sub=diaries", image: SUB_CATEGORY_IMAGE.diaries },
  { label: "Posters", href: "/category/print-on-demand?sub=posters", image: SUB_CATEGORY_IMAGE.posters },
];

const giftingFor = ["Employees", "Clients", "Team", "Family", "Friends", "Events"];

const trust = [
  { label: "Bulk pricing", icon: Tag },
  { label: "Free message card", icon: Gift },
  { label: "Delivery across India", icon: Truck },
  { label: "Secure payment", icon: ShieldCheck },
];

export default function Home() {
  const bestsellers = getBestsellers(4);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-4 sm:space-y-20 sm:py-8">
      <h1 className="sr-only">Stutium: corporate gifts, calendars and custom prints</h1>
      <BannerCarousel />

      <section aria-labelledby="shop-category">
        <SectionHeading
          id="shop-category"
          title="Explore Our Collections"
          subtitle="Everything you need to gift, brand and celebrate."
        />
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:grid-cols-6">
          {shopCategories.map((c) => (
            <CollectionCard key={c.label} label={c.label} href={c.href} image={c.image} />
          ))}
        </div>
      </section>

      <section aria-labelledby="shop-occasion">
        <SectionHeading id="shop-occasion" title="Shop by Occasion" subtitle="Find the right gift for every moment." />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {OCCASIONS.map((o) => (
            <Link
              key={o.slug}
              href={`/category/all?occasion=${o.slug}`}
              className="group relative block aspect-[3/2] overflow-hidden rounded-xl shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-brand-600 sm:aspect-[4/3] sm:rounded-2xl"
            >
              <SmartImage
                src={occasionImage(o.slug)}
                alt={o.name}
                sizes="(min-width: 1024px) 320px, 50vw"
                seed={o.slug}
                className="transition duration-500 group-hover:scale-110"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-5">
                <span className="text-sm font-bold leading-tight text-white sm:text-xl">{o.name}</span>
                <ArrowRight
                  className="hidden size-5 -translate-x-1 text-white opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 sm:block"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="bestsellers">
        <SectionHeading id="bestsellers" title="Bestsellers" subtitle="Most loved by teams across India." />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="gifting-for">
        <SectionHeading id="gifting-for" title="Gifting For" subtitle="Thoughtful picks for everyone on your list." />
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:grid-cols-6">
          {giftingFor.map((g) => (
            <CollectionCard key={g} label={g} href="/category/all" image={giftingImage(g)} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-linear-to-r from-[#fff1d6] to-[#fde0e8] shadow-sm ring-1 ring-line sm:rounded-3xl">
        <div className="grid items-stretch md:grid-cols-[1fr_340px]">
          <div className="order-2 flex flex-col items-start justify-center gap-4 p-5 sm:gap-5 sm:p-12 md:order-1">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-3xl">Add your logo. Personalise your gift.</h2>
              <p className="mt-1 text-sm text-muted sm:mt-2 sm:text-base">
                Upload your artwork and see a live preview before you order.
              </p>
            </div>
            <Link
              href="/category/all?personalised=yes"
              className="btn-gradient inline-flex h-10 items-center rounded-xl px-5 text-sm font-semibold shadow-md sm:h-12 sm:px-6 sm:text-base"
            >
              Personalise now
            </Link>
          </div>
          <div className="relative order-1 min-h-36 md:order-2 md:min-h-64">
            <SmartImage
              src="/images/personalise.jpg"
              alt="Custom printed merchandise with a company logo"
              sizes="(min-width: 768px) 340px, 100vw"
              seed="personalise"
            />
          </div>
        </div>
      </section>

      <section
        aria-label="Why Stutium"
        className="grid grid-cols-2 gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-line sm:gap-6 sm:rounded-2xl sm:p-6 lg:grid-cols-4"
      >
        {trust.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 sm:size-12">
              <Icon className="size-5 sm:size-6" aria-hidden />
            </span>
            <p className="text-xs font-semibold sm:text-base">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}