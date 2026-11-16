import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildHref, type Filters } from "@/lib/listing";
import { cn } from "@/lib/cn";

type Props = { path: string; filters: Filters; page: number; totalPages: number };

export function Pagination({ path, filters, page, totalPages }: Props) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const href = (n: number) => buildHref(path, filters, { page: n > 1 ? String(n) : undefined });
  const box =
    "flex size-11 items-center justify-center rounded-xl text-sm font-semibold shadow-sm ring-1 ring-line transition focus-visible:outline-2 focus-visible:outline-brand-600";

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} aria-label="Previous page" className={cn(box, "bg-white hover:bg-brand-50")}>
          <ChevronLeft className="size-5" aria-hidden />
        </Link>
      )}
      {pages.map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(box, n === page ? "btn-gradient ring-0" : "bg-white hover:bg-brand-50")}
        >
          {n}
        </Link>
      ))}
      {page < totalPages && (
        <Link href={href(page + 1)} aria-label="Next page" className={cn(box, "bg-white hover:bg-brand-50")}>
          <ChevronRight className="size-5" aria-hidden />
        </Link>
      )}
    </nav>
  );
}