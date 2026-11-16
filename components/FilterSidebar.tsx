"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import { FILTER_GROUPS } from "@/lib/listing";

export function FilterSidebar({ plain }: { plain?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  function update(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(sp.toString());
    mutate(params);
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggle(key: string, value: string) {
    update((p) => (p.get(key) === value ? p.delete(key) : p.set(key, value)));
  }

  function clearAll() {
    update((p) => FILTER_GROUPS.forEach((g) => p.delete(g.key)));
  }

  const hasFilters = FILTER_GROUPS.some((g) => sp.get(g.key));

  return (
    <div className={cn("space-y-6 p-5", !plain && "rounded-2xl bg-white shadow-sm ring-1 ring-line")}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <SlidersHorizontal className="size-5 text-brand-600" aria-hidden />
          Filters
        </h2>
        {hasFilters && (
          <button type="button" onClick={clearAll} className="text-sm font-semibold text-brand-700 hover:underline">
            Clear all
          </button>
        )}
      </div>

      {FILTER_GROUPS.map((g) => (
        <fieldset key={g.key} className="space-y-1 border-t border-line pt-4">
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">{g.title}</legend>
          {g.options.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-brand-50"
            >
              <input
                type="checkbox"
                checked={sp.get(g.key) === o.value}
                onChange={() => toggle(g.key, o.value)}
                className="size-4 rounded accent-brand-600"
              />
              {o.label}
            </label>
          ))}
        </fieldset>
      ))}
    </div>
  );
}
