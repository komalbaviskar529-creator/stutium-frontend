import { OCCASIONS } from "@/lib/occasions";
import type { Product } from "@/lib/types";

export type RawParams = Record<string, string | string[] | undefined>;

export type Filters = {
  sub?: string;
  delivery?: string;
  price?: string;
  occasion?: string;
  moq?: string;
  personalised?: string;
  sort: string;
  page: number;
};

export const PAGE_SIZE = 8;

export const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Rating" },
];

export const FILTER_GROUPS: { key: string; title: string; options: { value: string; label: string }[] }[] = [
  {
    key: "delivery",
    title: "Delivery date",
    options: [
      { value: "today", label: "Today" },
      { value: "tomorrow", label: "By tomorrow" },
      { value: "3days", label: "Within 3 days" },
    ],
  },
  {
    key: "price",
    title: "Price",
    options: [
      { value: "under-200", label: "Under ₹200" },
      { value: "200-500", label: "₹200 - ₹500" },
      { value: "above-500", label: "Above ₹500" },
    ],
  },
  { key: "occasion", title: "Occasion", options: OCCASIONS.map((o) => ({ value: o.slug, label: o.name })) },
  {
    key: "moq",
    title: "Min. order qty",
    options: [
      { value: "1", label: "Single piece" },
      { value: "25", label: "Up to 25" },
      { value: "100", label: "Up to 100" },
    ],
  },
  { key: "personalised", title: "Personalisation", options: [{ value: "yes", label: "Personalisable" }] },
];

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseFilters(raw: RawParams): Filters {
  const page = Number(one(raw.page));
  return {
    sub: one(raw.sub),
    delivery: one(raw.delivery),
    price: one(raw.price),
    occasion: one(raw.occasion),
    moq: one(raw.moq),
    personalised: one(raw.personalised),
    sort: one(raw.sort) ?? "popularity",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function applyFilters(list: Product[], f: Filters): Product[] {
  return list.filter((p) => {
    if (f.sub && p.subCategory !== f.sub) return false;
    if (f.delivery === "today" && p.deliveryDays > 0) return false;
    if (f.delivery === "tomorrow" && p.deliveryDays > 1) return false;
    if (f.delivery === "3days" && p.deliveryDays > 3) return false;
    if (f.price === "under-200" && !(p.price < 200)) return false;
    if (f.price === "200-500" && !(p.price >= 200 && p.price <= 500)) return false;
    if (f.price === "above-500" && !(p.price > 500)) return false;
    if (f.occasion && !p.occasions.includes(f.occasion)) return false;
    if (f.moq && p.moq > Number(f.moq)) return false;
    if (f.personalised === "yes" && !p.personalisable) return false;
    return true;
  });
}

export function applySort(list: Product[], sort: string): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => b.reviews - a.reviews);
  }
}

export function paginate<T>(list: T[], page: number) {
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  return {
    items: list.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    page: current,
    totalPages,
    total: list.length,
  };
}

export function buildHref(
  path: string,
  f: Filters,
  overrides: Partial<Record<keyof Filters, string | undefined>> = {}
): string {
  const merged: Record<string, string | undefined> = {
    sub: f.sub,
    delivery: f.delivery,
    price: f.price,
    occasion: f.occasion,
    moq: f.moq,
    personalised: f.personalised,
    sort: f.sort === "popularity" ? undefined : f.sort,
    page: f.page > 1 ? String(f.page) : undefined,
    ...overrides,
  };
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}