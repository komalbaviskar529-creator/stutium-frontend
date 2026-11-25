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

  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (n: number) => setIndex((n + slides.length) % slides.length);
  const slide = slides[index];
  const arrow =
    "absolute top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured offers"
      className={cn("relative min-h-[22rem] overflow-hidden rounded-3xl bg-linear-to-br shadow-xl md:min-h-[26rem]", slide.bg)}
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

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/75 via-black/50 to-black/10" />

      <div
        key={index}
        className="animate-fade-up relative z-10 flex min-h-[22rem] max-w-2xl flex-col items-start justify-center px-8 py-14 sm:px-20 md:min-h-[26rem]"
      >
        <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
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

      <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={cn(arrow, "left-3")}>
        <ChevronLeft className="size-6" aria-hidden />
      </button>
      <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={cn(arrow, "right-3")}>
        <ChevronRight className="size-6" aria-hidden />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
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