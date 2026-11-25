 import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { CartLink } from "@/components/CartLink";
import { PincodeButton } from "@/components/PincodeButton";

const iconLink =
  "flex-col items-center gap-0.5 p-2 text-xs font-medium hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600 sm:p-0";

export function Header() {
  return (
    <header className="relative z-40 bg-white shadow-sm md:sticky md:top-0">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2 sm:gap-x-5 sm:gap-y-3 sm:px-4 sm:py-3">
        <Link href="/" className="font-display text-2xl font-bold italic text-brand-700 sm:text-3xl">
          Stutium
        </Link>

        <PincodeButton />

        <div className="relative order-last w-full md:order-none md:w-auto md:flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted sm:left-4 sm:size-5"
            aria-hidden
          />
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search gifts, calendars, mugs..."
            className="h-10 w-full rounded-full border border-line bg-surface pl-9 pr-4 text-sm shadow-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-brand-600 sm:h-12 sm:pl-12"
          />
        </div>

        <nav aria-label="Account" className="ml-auto flex items-center gap-1 sm:gap-5">
          <button type="button" className={`hidden sm:flex ${iconLink}`}>
            <Bell className="size-6" aria-hidden />
            Reminders
          </button>
          <button type="button" aria-label="Login" className={`flex ${iconLink}`}>
            <User className="size-6" aria-hidden />
            <span className="hidden sm:inline">Login</span>
          </button>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}