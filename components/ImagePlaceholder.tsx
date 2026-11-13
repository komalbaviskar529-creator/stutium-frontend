 import { Gift } from "lucide-react";
import { cn } from "@/lib/cn";
import { gradientAt } from "@/lib/gradients";

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function ImagePlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className={cn(
        "flex items-center justify-center bg-linear-to-br",
        gradientAt(hash(label ?? "image")),
        className
      )}
    >
      <Gift className="size-12 text-white/80" aria-hidden />
    </div>
  );
}