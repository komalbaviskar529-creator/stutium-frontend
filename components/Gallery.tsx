 "use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { productImage } from "@/lib/images";
import { SmartImage } from "@/components/SmartImage";

const VIEWS = [
  { label: "Front view", scale: 1, origin: "50% 50%" },
  { label: "Close-up", scale: 1.7, origin: "50% 50%" },
  { label: "Top detail", scale: 2, origin: "30% 20%" },
  { label: "Bottom detail", scale: 2, origin: "70% 80%" },
];

export function Gallery({ name, slug }: { name: string; slug: string }) {
  const [active, setActive] = useState(0);
  const src = productImage(slug);
  const view = VIEWS[active];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-md">
        <SmartImage
          src={src}
          alt={`${name} - ${view.label}`}
          sizes="(min-width: 1024px) 600px, 100vw"
          priority
          seed={slug}
          className="transition duration-300"
          style={{ transform: `scale(${view.scale})`, transformOrigin: view.origin }}
        />
      </div>
      <ul className="grid grid-cols-4 gap-3">
        {VIEWS.map((v, i) => (
          <li key={v.label}>
            <button
              type="button"
              aria-label={`Show ${v.label}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "block w-full overflow-hidden rounded-xl ring-2 transition focus-visible:outline-2 focus-visible:outline-brand-600",
                i === active ? "ring-brand-600" : "ring-transparent hover:ring-line"
              )}
            >
              <span className="relative block aspect-square w-full overflow-hidden">
                <SmartImage
                  src={src}
                  alt={`${name} - ${v.label}`}
                  sizes="120px"
                  seed={slug}
                  style={{ transform: `scale(${v.scale})`, transformOrigin: v.origin }}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}