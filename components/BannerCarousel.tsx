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
    "absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn("relative w-full overflow-hidden bg-linear-to-br", slide.bg)}
    >
      <div className="relative h-[22rem] sm:h-[27rem] lg:h-[33rem]">
        {slides.map((s, i) => (
          <Image
            key={s.image}
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            aria-hidden={i !== index}
            className={cn("object-cover transition-opacity duration-700", i === index ? "opacity-100" : "opacity-0")}
          />
        ))}

        <div className="absolute inset-0 z-10 bg-linear-to-r from-black/75 via-black/45 to-black/5" />

        <div
          key={index}
          className="animate-fade-up relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-center px-6 sm:px-16"
        >
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
              {slide.tag}
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              {slide.title}
            </h2>
            <p className="mt-3 text-lg text-white/90">{slide.text}</p>
            <Link
              href={slide.href}
              className="mt-7 inline-flex h-12 items-center rounded-xl bg-white px-6 font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
            >
              {slide.cta}
            </Link>
          </div>
        </div>

        <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={cn(arrow, "left-3 sm:left-6")}>
          <ChevronLeft className="size-6" aria-hidden />
        </button>
        <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={cn(arrow, "right-3 sm:right-6")}>
          <ChevronRight className="size-6" aria-hidden />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
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
      </div>
    </section>
  );
}