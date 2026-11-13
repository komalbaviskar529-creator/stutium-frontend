 import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  CalendarDays,
  Coffee,
  Droplet,
  Gift,
  Heart,
  Image as ImageIcon,
  PartyPopper,
  PenTool,
  ShieldCheck,
  Smile,
  Tag,
  Truck,
  UserCheck,
  Users,
} from "lucide-react";
import { BannerCarousel } from "@/components/BannerCarousel";
import { CollectionCard } from "@/components/CollectionCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getBestsellers } from "@/lib/products";
import { OCCASIONS } from "@/lib/occasions";
import { gradientAt } from "@/lib/gradients";

const shopCategories = [
  { label: "Mugs", href: "/category/corporate-gifts?sub=mugs", icon: Coffee },
  { label: "Pens", href: "/category/corporate-gifts?sub=pens", icon: PenTool },
  { label: "Bottles", href: "/category/corporate-gifts?sub=bottles", icon: Droplet },
  { label: "Calendars", href: "/category/calendars-diaries?sub=wall-calendars", icon: CalendarDays },
  { label: "Diaries", href: "/category/calendars-diaries?sub=diaries", icon: BookOpen },
  { label: "Posters", href: "/category/print-on-demand?sub=posters", icon: ImageIcon },
];

const giftingFor = [
  { label: "Employees", icon: Briefcase },
  { label: "Clients", icon: UserCheck },
  { label: "Team", icon: Users },
  { label: "Family", icon: Heart },
  { label: "Friends", icon: Smile },
  { label: "Events", icon: PartyPopper },
];

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
          {shopCategories.map((c, i) => (
            <CollectionCard key={c.label} label={c.label} href={c.href} icon={c.icon} gradient={gradientAt(i)} />
          ))}
        </div>
      </section>

      <section aria-labelledby="shop-occasion">
        <SectionHeading id="shop-occasion" title="Shop by Occasion" subtitle="Find the right gift for every moment." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {OCCASIONS.map((o, i) => (
            <Link
              key={o.slug}
              href={`/category/all?occasion=${o.slug}`}
              className={`relative flex h-32 items-end overflow-hidden rounded-2xl bg-linear-to-br ${gradientAt(i + 2)} p-4 text-lg font-bold text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-brand-600`}
            >
              <Gift className="absolute -right-3 -top-3 size-20 text-white/20" aria-hidden />
              {o.name}
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
          {giftingFor.map((g, i) => (
            <CollectionCard key={g.label} label={g.label} href="/category/all" icon={g.icon} gradient={gradientAt(i + 3)} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-linear-to-r from-[#fff1d6] to-[#fde0e8] p-8 shadow-sm ring-1 ring-line sm:flex-row sm:items-center sm:p-12">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Add your logo. Personalise your gift.</h2>
          <p className="mt-2 text-muted">Upload your artwork and see a live preview before you order.</p>
        </div>
        <Link
          href="/category/all?personalised=yes"
          className="btn-gradient inline-flex h-12 shrink-0 items-center rounded-xl px-6 font-semibold shadow-md"
        >
          Personalise now
        </Link>
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