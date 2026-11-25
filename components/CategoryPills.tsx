 import Link from "next/link";
import { cn } from "@/lib/cn";
import { gradientAt } from "@/lib/gradients";
import { SmartImage } from "@/components/SmartImage";

export type Pill = { label: string; href: string; active?: boolean; image?: string };

export function CategoryPills({ items }: { items: Pill[] }) {
  return (
    <ul className="flex gap-2 overflow-x-auto pb-2">
      {items.map((p, i) => (
        <li key={p.label} className="shrink-0">
          <Link
            href={p.href}
            aria-current={p.active ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-full py-1 pl-1 pr-4 text-[13px] font-semibold shadow-sm ring-1 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand-600",
              p.active ? "bg-brand-50 text-brand-700 ring-brand-600" : "bg-white ring-line"
            )}
          >
            <span
              className={cn(
                "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br text-xs font-bold text-white",
                gradientAt(i)
              )}
            >
              {p.image ? <SmartImage src={p.image} alt="" sizes="32px" seed={p.label} /> : p.label.slice(0, 1)}
            </span>
            {p.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}