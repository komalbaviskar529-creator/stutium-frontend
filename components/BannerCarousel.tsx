 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const slides = [
  { title: "Corporate gifts with your logo", text: "Bulk pricing for teams, clients and events.", href: "/category/corporate-gifts", cta: "Shop corporate gifts" },
  { title: "2027 calendars and diaries", text: "Custom covers, sizes and binding.", href: "/category/calendars-diaries", cta: "Shop calendars and diaries" },
  { title: "Print anything, even one piece", text: "Posters, cards, stickers and notebooks.", href: "/category/print-on-demand", cta: "Shop print on demand" },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (n: number) => setIndex((n + slides.length) % slides.length);
  const slide = slides[index];
  const arrow =
    "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl shadow hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-600";

  return (
    <section aria-roledescription="carousel" aria-label="Featured offers" className="relative overflow-hidden rounded-2xl bg-brand-50">
      <div className="flex min-h-60 flex-col items-center justify-center gap-3 px-14 py-10 text-center sm:min-h-80">
        <h2 className="text-2xl font-bold sm:text-4xl">{slide.title}</h2>
        <p className="text-muted">{slide.text}</p>
        <Link
          href={slide.href}
          className="mt-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {slide.cta}
        </Link>
      </div>
      <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={cn(arrow, "left-3")}>
        ‹
      </button>
      <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={cn(arrow, "right-3")}>
        ›
      </button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn("size-2.5 rounded-full", i === index ? "bg-brand-600" : "bg-line")}
          />
        ))}
      </div>
    </section>
  );
}