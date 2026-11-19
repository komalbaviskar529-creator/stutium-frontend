"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Gift } from "lucide-react";
import { cn } from "@/lib/cn";
import { gradientAt } from "@/lib/gradients";

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  seed?: string;
  style?: CSSProperties;
};

export function SmartImage({ src, alt, sizes, className, priority, seed, style }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    const a11y = alt ? { role: "img" as const, "aria-label": alt } : { "aria-hidden": true };
    return (
      <div
        {...a11y}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-linear-to-br",
          gradientAt(hash(seed ?? alt ?? src))
        )}
      >
        <Gift className="size-10 text-white/80" aria-hidden />
      </div>
    );
  }

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={style}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}