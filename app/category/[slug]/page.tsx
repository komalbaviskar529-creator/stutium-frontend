 import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { ActiveFilters } from "@/components/ActiveFilters";
import { CategoryPills, type Pill } from "@/components/CategoryPills";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { SmartImage } from "@/components/SmartImage";
import { SortSelect } from "@/components/SortSelect";
import { CATEGORY_IMAGE, SUB_CATEGORY_IMAGE } from "@/lib/images";
import {
  PAGE_SIZE,
  applyFilters,
  applySort,
  buildHref,
  paginate,
  parseFilters,
  type RawParams,
} from "@/lib/listing";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<RawParams>;
};

const BLURBS: Record<string, string> = {
  all: "Every gift, calendar and print in one place.",
  "corporate-gifts": "Mugs, pens, bottles and gift boxes with your logo.",
  "calendars-diaries": "2027 calendars, diaries and planners with custom covers.",
  "print-on-demand": "Posters, cards, stickers and notebooks, even a single piece.",
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category ? `${category.name} | Stutium` : "Category | Stutium" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const filters = parseFilters(await searchParams);
  const path = `/category/${slug}`;

  const filtered = applySort(applyFilters(getProductsByCategory(slug), filters), filters.sort);
  const { items, page, totalPages, total } = paginate(filtered, filters.page);
  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = start + items.length - 1;

  const pills: Pill[] =
    slug === "all"
      ? getCategories()
          .filter((c) => c.slug !== "all")
          .map((c) => ({ label: c.name, href: `/category/${c.slug}`, image: CATEGORY_IMAGE[c.slug] }))
      : [
          {
            label: "All",
            href: buildHref(path, filters, { sub: undefined, page: undefined }),
            active: !filters.sub,
            image: CATEGORY_IMAGE[slug],
          },
          ...category.subCategories.map((s) => ({
            label: s.name,
            href: buildHref(path, filters, { sub: s.slug, page: undefined }),
            active: filters.sub === s.slug,
            image: SUB_CATEGORY_IMAGE[s.slug],
          })),
        ];

  return (
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-4 sm:space-y-8 sm:py-8">
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#4a3560] to-[#e9b99a] px-5 py-6 text-white shadow-lg sm:px-12 sm:py-12">
        <SmartImage
          src={CATEGORY_IMAGE[slug] ?? CATEGORY_IMAGE.all}
          alt=""
          sizes="1216px"
          seed={slug}
          priority
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/10" />
        <div className="relative">
          <nav aria-label="Breadcrumb" className="text-sm text-white/80">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            › {category.name}
          </nav>
             <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl"></h1>
          <p className="mt-2 max-w-xl text-white/90">{BLURBS[slug] ?? BLURBS.all}</p>
        </div>
      </section>

      <CategoryPills items={pills} />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <details className="rounded-2xl bg-white shadow-sm ring-1 ring-line lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 p-4 font-semibold">
              <SlidersHorizontal className="size-5 text-brand-600" aria-hidden />
              Filters
            </summary>
            <Suspense fallback={null}>
              <FilterSidebar plain />
            </Suspense>
          </details>
          <div className="hidden lg:block">
            <Suspense fallback={null}>
              <FilterSidebar />
            </Suspense>
          </div>
        </aside>

        <section aria-label="Products">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {total === 0 ? "No products" : `Showing ${start}-${end} of ${total} products`}
            </p>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>

          <ActiveFilters path={path} filters={filters} category={category} />

          {items.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-line">
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <SearchX className="size-8" aria-hidden />
              </span>
              <p className="mt-4 text-lg font-bold">No products match these filters</p>
              <p className="mt-1 text-sm text-muted">Try removing a filter or choosing another category.</p>
              <Link
                href={path}
                className="btn-gradient mt-5 inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold shadow-md"
              >
                Clear filters
              </Link>
            </div>
          ) : (
            <div className=" grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <Pagination path={path} filters={filters} page={page} totalPages={totalPages} />
        </section>
      </div>
    </div>
  );
}