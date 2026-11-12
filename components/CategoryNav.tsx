import Link from "next/link";

const items = [
  { label: "Corporate Gifts", href: "/category/corporate-gifts" },
  { label: "Calendars & Diaries", href: "/category/calendars-diaries" },
  { label: "Print on Demand", href: "/category/print-on-demand" },
  { label: "Occasions", href: "/category/all" },
  { label: "Gifting For", href: "/category/all" },
];

export function CategoryNav() {
  return (
    <nav aria-label="Categories" className="border-b border-line">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3">
        {items.map((c) => (
          <li key={c.label} className="shrink-0">
            <Link
              href={c.href}
              className="block rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100"
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}