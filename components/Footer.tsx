 import { Button } from "@/components/ui/Button";

const columns = [
  { title: "About", links: ["Our story", "Careers", "Blog"] },
  { title: "Help", links: ["FAQs", "Shipping", "Returns"] },
  { title: "Policies", links: ["Privacy", "Terms", "Refunds"] },
  { title: "Contact", links: ["Email us", "Call us", "Bulk orders"] },
];

export function Footer() {
  return (
    <footer className="mt-12 bg-ink text-white sm:mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:gap-8 sm:py-12 lg:grid-cols-6">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide sm:mb-4 sm:text-sm">{col.title}</h3>
            <ul className="space-y-1.5 text-sm text-white/70 sm:space-y-2">
              {col.links.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-2">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wide sm:mb-4 sm:text-sm">Newsletter</h3>
          <p className="mb-3 text-sm text-white/70">Offers and gifting ideas in your inbox.</p>
          <div className="flex gap-2">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your email"
              className="h-11 min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 focus-visible:outline-2 focus-visible:outline-white"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-white/60 sm:py-5">© Stutium</p>
    </footer>
  );
}