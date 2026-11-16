 import Link from "next/link";
import { Bell, MapPin, Search, ShoppingBag, User } from "lucide-react";

const iconLink =
  "flex flex-col items-center gap-0.5 text-xs font-medium hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3">
        <Link href="/" className="font-display text-3xl font-bold italic text-brand-700">
          Stutium
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium hover:border-brand-600"
        >
          <MapPin className="size-4 text-brand-600" aria-hidden />
          Deliver to: <span className="font-bold">Pincode</span>
        </button>

        <div className="relative order-last w-full md:order-none md:w-auto md:flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search gifts, calendars, mugs..."
            className="h-12 w-full rounded-full border border-line bg-surface pl-12 pr-4 text-sm shadow-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-brand-600"
          />
        </div>

        <nav aria-label="Account" className="ml-auto flex items-center gap-5">
          <button type="button" className={`${iconLink} hidden sm:flex`}>
            <Bell className="size-6" aria-hidden />
            Reminders
          </button>
          <button type="button" className={iconLink}>
            <User className="size-6" aria-hidden />
            Login
          </button>
          <Link href="/cart" aria-label="Cart, 0 items" className={`${iconLink} relative`}>
            <ShoppingBag className="size-6" aria-hidden />
            Cart
            <span className="absolute -right-2.5 -top-1 flex size-5 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
              0
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}