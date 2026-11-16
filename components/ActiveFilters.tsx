import Link from "next/link";
import { X } from "lucide-react";
import { FILTER_GROUPS, buildHref, type Filters } from "@/lib/listing";
import type { Category } from "@/lib/types";

type Props = { path: string; filters: Filters; category: Category };

export function ActiveFilters({ path, filters, category }: Props) {
  const chips: { key: keyof Filters; label: string }[] = [];

  if (filters.sub) {
    const s = category.subCategories.find((x) => x.slug === filters.sub);
    chips.push({ key: "sub", label: s?.name ?? filters.sub });
  }
  for (const g of FILTER_GROUPS) {
    const value = filters[g.key as keyof Filters];
    if (typeof value === "string") {
      const o = g.options.find((x) => x.value === value);
      chips.push({ key: g.key as keyof Filters, label: o?.label ?? value });
    }
  }
  if (chips.length === 0) return null;

  function removeHref(key: keyof Filters) {
    const overrides: Partial<Record<keyof Filters, string | undefined>> = { page: undefined };
    overrides[key] = undefined;
    return buildHref(path, filters, overrides);
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-muted">Active:</span>
      {chips.map((c) => (
        <Link
          key={c.key}
          href={removeHref(c.key)}
          aria-label={`Remove filter ${c.label}`}
          className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-brand-600"
        >
          {c.label}
          <X className="size-4" aria-hidden />
        </Link>
      ))}
    </div>
  );
}