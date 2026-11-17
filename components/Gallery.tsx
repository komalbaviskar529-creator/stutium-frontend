"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const VIEWS = ["Front view", "Side view", "Close-up", "Packaging"];

export function Gallery({ name }: { name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <ImagePlaceholder
        label={`${name} - ${VIEWS[active]}`}
        className="aspect-square w-full rounded-3xl shadow-md"
      />
      <ul className="grid grid-cols-4 gap-3">
        {VIEWS.map((view, i) => (
          <li key={view}>
            <button
              type="button"
              aria-label={`Show ${view}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "block w-full overflow-hidden rounded-xl ring-2 transition focus-visible:outline-2 focus-visible:outline-brand-600",
                i === active ? "ring-brand-600" : "ring-transparent hover:ring-line"
              )}
            >
              <ImagePlaceholder label={`${name} - ${view}`} className="aspect-square w-full" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}