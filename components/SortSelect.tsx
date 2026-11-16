"use client";

import type { ChangeEvent } from "react";
import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/listing";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(sp.toString());
    if (e.target.value === "popularity") params.delete("sort");
    else params.set("sort", e.target.value);
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <ArrowUpDown className="size-4 text-brand-600" aria-hidden />
      <span className="text-muted">Sort by</span>
      <select
        value={sp.get("sort") ?? "popularity"}
        onChange={onChange}
        className="h-11 rounded-full border border-line bg-white px-4 text-sm font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}