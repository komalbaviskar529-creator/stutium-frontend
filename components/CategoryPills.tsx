 
 
 import Link from "next/link";
import { cn } from "@/lib/cn";
import { gradientAt } from "@/lib/gradients";
import { SmartImage } from "@/components/SmartImage";

export type Pill = { label: string; href: string; active?: boolean; image?: string };

export function CategoryPills({ items }: { items: Pill[] }) {
  return (
    <ul className="flex gap-3 overflow-x-auto pb-2">
      {items.map((p, i) => (
        <li key={p.label} className="shrink-0">
          <Link
            href={p.href}
            aria-current={p.active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-full py-2 pl-2 pr-5 text-sm font-semibold shadow-sm ring-1 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand-600",
              p.active ? "bg-brand-50 text-brand-700 ring-brand-600" : "bg-white ring-line"
            )}
          >
            <span
              className={cn(
                "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br font-bold text-white",
                gradientAt(i)
              )}
            >
              {p.image ? <SmartImage src={p.image} alt="" sizes="40px" seed={p.label} /> : p.label.slice(0, 1)}
            </span>
            {p.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}