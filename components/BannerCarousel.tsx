 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

const slides = [
  {
    tag: "Corporate Gifts",
    title: "Corporate gifts with your logo",
    text: "Bulk pricing for teams, clients and events.",
    href: "/category/corporate-gifts",
    cta: "Browse category",
    image: "/images/banners/banner-1.jpg",
    alt: "A branded corporate gift box",
    bg: "from-[#4a3560] to-[#e9b99a]",
  },
  {
    tag: "Calendars & Diaries",
    title: "2027 calendars and diaries",
    text: "Custom covers, sizes and binding options.",
    href: "/category/calendars-diaries",
    cta: "Browse category",
    image: "/images/banners/banner-2.jpg",
    alt: "A desk calendar and diary on a desk",
    bg: "from-[#134e4a] to-[#e9d8a6]",
  },
  {
    tag: "Print on Demand",
    title: "Print anything, even one piece",
    text: "Posters, cards, stickers and notebooks.",
    href: "/category/print-on-demand",
    cta: "Browse category",
    image: "/images/banners/banner-3.jpg",
    alt: "Custom printed posters",
    bg: "from-[#7c2d12] to-[#fcd9a8]",
  },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (n: number) => setIndex((n + slides.length) % slides.length);
  const slide = slides[index];
  const arrow =
    "absolute top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white focus-visible:outline-2 focus-visible:outline-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn("relative h-64 overflow-hidden rounded-2xl bg-linear-to-br shadow-md sm:h-72 lg:h-80", slide.bg)}
    >
      {slides.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes="(min-width: 1280px) 1216px, 100vw"
          aria-hidden={i !== index}
          className={cn("object-cover transition-opacity duration-700", i === index ? "opacity-100" : "opacity-0")}
        />
      ))}

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/75 via-black/45 to-black/5" />

      <div
        key={index}
        className="animate-fade-up relative z-10 flex h-full max-w-xl flex-col items-start justify-center px-12 sm:px-16"
      >
        <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
          {slide.tag}
        </span>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">{slide.title}</h2>
        <p className="mt-2 text-sm text-white/90 sm:text-base">{slide.text}</p>
        <Link
          href={slide.href}
          className="mt-4 inline-flex h-10 items-center rounded-lg bg-white px-5 text-sm font-semibold text-brand-700 shadow-md transition hover:bg-brand-50"
        >
          {slide.cta}
        </Link>
      </div>

      <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={cn(arrow, "left-2")}>
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={cn(arrow, "right-2")}>
        <ChevronRight className="size-5" aria-hidden />
      </button>

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-white" : "w-2 bg-white/50")}
          />
        ))}
      </div>
    </section>
  );
}