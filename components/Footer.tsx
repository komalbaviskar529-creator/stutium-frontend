import { Button } from "@/components/ui/Button";

const columns = [
  { title: "About", links: ["Our story", "Careers", "Blog"] },
  { title: "Help", links: ["FAQs", "Shipping", "Returns"] },
  { title: "Policies", links: ["Privacy", "Terms", "Refunds"] },
  { title: "Contact", links: ["Email us", "Call us", "Bulk orders"] },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-6">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-3 text-sm font-bold">{col.title}</h3>
            <ul className="space-y-2 text-sm text-muted">
              {col.links.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="sm:col-span-2">
          <h3 className="mb-3 text-sm font-bold">Newsletter</h3>
          <div className="flex gap-2">
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter your email"
              className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-sm"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">© Stutium</p>
    </footer>
  );
}