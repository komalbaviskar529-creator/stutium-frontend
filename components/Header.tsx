import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-brand-700">
          Stutium
        </Link>
        <button type="button" className="rounded-lg border border-line bg-white px-3 py-2 text-sm">
          Deliver to: <span className="font-semibold">Pincode</span>
        </button>
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search gifts, calendars, mugs..."
          className="order-last h-10 w-full rounded-lg border border-line bg-white px-3 text-sm md:order-none md:w-auto md:flex-1"
        />
        <nav aria-label="Account" className="ml-auto flex items-center gap-4 text-sm">
          <button type="button" className="hidden sm:inline">Reminders</button>
          <button type="button" className="hidden sm:inline">Login</button>
          <Link href="/cart" className="font-semibold">
            Cart (0)
          </Link>
        </nav>
      </div>
    </header>
  );
}