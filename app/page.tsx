 import Link from "next/link";
import { Gift, ShieldCheck, Tag, Truck } from "lucide-react";
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
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-8">
      <BannerCarousel />

      <section aria-labelledby="shop-category">
        <SectionHeading
          id="shop-category"
          title="Explore Our Collections"
          subtitle="Everything you need to gift, brand and celebrate."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {shopCategories.map((c) => (
            <CollectionCard key={c.label} label={c.label} href={c.href} image={c.image} />
          ))}
        </div>
      </section>

      <section aria-labelledby="shop-occasion">
        <SectionHeading id="shop-occasion" title="Shop by Occasion" subtitle="Find the right gift for every moment." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {OCCASIONS.map((o) => (
            <Link
              key={o.slug}
              href={`/category/all?occasion=${o.slug}`}
              className="group relative block h-36 overflow-hidden rounded-2xl shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <SmartImage
                src={occasionImage(o.slug)}
                alt={o.name}
                sizes="(min-width: 1024px) 300px, 50vw"
                seed={o.slug}
                className="transition duration-500 group-hover:scale-110"
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-lg font-bold text-white">{o.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="bestsellers">
        <SectionHeading id="bestsellers" title="Bestsellers" subtitle="Most loved by teams across India." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="gifting-for">
        <SectionHeading id="gifting-for" title="Gifting For" subtitle="Thoughtful picks for everyone on your list." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {giftingFor.map((g) => (
            <CollectionCard key={g} label={g} href="/category/all" image={giftingImage(g)} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-linear-to-r from-[#fff1d6] to-[#fde0e8] shadow-sm ring-1 ring-line">
        <div className="grid items-stretch md:grid-cols-[1fr_340px]">
          <div className="flex flex-col items-start justify-center gap-5 p-8 sm:p-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Add your logo. Personalise your gift.</h2>
              <p className="mt-2 text-muted">Upload your artwork and see a live preview before you order.</p>
            </div>
            <Link
              href="/category/all?personalised=yes"
              className="btn-gradient inline-flex h-12 items-center rounded-xl px-6 font-semibold shadow-md"
            >
              Personalise now
            </Link>
          </div>
          <div className="relative hidden min-h-64 md:block">
            <SmartImage
              src="/images/personalise.jpg"
              alt="Custom printed merchandise with a company logo"
              sizes="340px"
              seed="personalise"
            />
          </div>
        </div>
      </section>

      <section aria-label="Why Stutium" className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon className="size-6" aria-hidden />
            </span>
            <p className="font-semibold">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}