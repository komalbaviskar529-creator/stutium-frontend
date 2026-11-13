 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, Gift, Printer } from "lucide-react";
import { cn } from "@/lib/cn";

const slides = [
  {
    tag: "Corporate Gifts",
    title: "Corporate gifts with your logo",
    text: "Bulk pricing for teams, clients and events.",
    href: "/category/corporate-gifts",
    cta: "Browse category",
    icon: Gift,
    bg: "from-[#4a3560] via-[#8a5a83] to-[#e9b99a]",
  },
  {
    tag: "Calendars & Diaries",
    title: "2027 calendars and diaries",
    text: "Custom covers, sizes and binding options.",
    href: "/category/calendars-diaries",
    cta: "Browse category",
    icon: CalendarDays,
    bg: "from-[#134e4a] via-[#2a7f73] to-[#e9d8a6]",
  },
  {
    tag: "Print on Demand",
    title: "Print anything, even one piece",
    text: "Posters, cards, stickers and notebooks.",
    href: "/category/print-on-demand",
    cta: "Browse category",
    icon: Printer,
    bg: "from-[#7c2d12] via-[#c2410c] to-[#fcd9a8]",
  },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (n: number) => setIndex((n + slides.length) % slides.length);
  const slide = slides[index];
  const Icon = slide.icon;
  const arrow =
    "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className={cn("relative overflow-hidden rounded-3xl bg-linear-to-br shadow-xl", slide.bg)}
    >
      <div
        key={index}
        className="animate-fade-up grid min-h-[22rem] items-center gap-6 px-8 py-14 sm:px-20 md:grid-cols-2"
      >
        <div>
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {slide.tag}
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">{slide.title}</h2>
          <p className="mt-3 text-lg text-white/90">{slide.text}</p>
          <Link
            href={slide.href}
            className="mt-7 inline-flex h-12 items-center rounded-xl bg-white px-6 font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            {slide.cta}
          </Link>
        </div>
        <div aria-hidden className="hidden items-center justify-center md:flex">
          <div className="flex size-64 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
            <Icon className="size-28 text-white" />
          </div>
        </div>
      </div>

      <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={cn(arrow, "left-3")}>
        <ChevronLeft className="size-6" aria-hidden />
      </button>
      <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={cn(arrow, "right-3")}>
        <ChevronRight className="size-6" aria-hidden />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn("h-2.5 rounded-full transition-all", i === index ? "w-7 bg-white" : "w-2.5 bg-white/50")}
          />
        ))}
      </div>
    </section>
  );
}