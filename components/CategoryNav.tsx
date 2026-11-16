 import Link from "next/link";
import { CalendarDays, Gift, Printer, Sparkles, Users } from "lucide-react";

const items = [
  { label: "Corporate Gifts", href: "/category/corporate-gifts", icon: Gift, color: "bg-emerald-500" },
  { label: "Calendars & Diaries", href: "/category/calendars-diaries", icon: CalendarDays, color: "bg-pink-500" },
  { label: "Print on Demand", href: "/category/print-on-demand", icon: Printer, color: "bg-orange-500" },
  { label: "Occasions", href: "/category/all", icon: Sparkles, color: "bg-amber-500" },
  { label: "Gifting For", href: "/category/all", icon: Users, color: "bg-teal-500" },
];

export function CategoryNav() {
  return (
    <nav aria-label="Categories" className="border-b border-line bg-linear-to-b from-[#fff7ec] to-[#fbf1e3]">
      <ul className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4">
        {items.map(({ label, href, icon: Icon, color }) => (
          <li key={label} className="shrink-0">
            <Link
              href={href}
              className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-sm font-semibold shadow-sm ring-1 ring-line transition hover:shadow-md hover:ring-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600"
            >
              <span className={`flex size-9 items-center justify-center rounded-full text-white ${color}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}