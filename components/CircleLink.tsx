import Link from "next/link";
import { cn } from "@/lib/cn";

export function CircleLink({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <Link href={href} className="flex w-24 shrink-0 flex-col items-center gap-2 text-center text-sm">
      <span
        className={cn(
          "flex size-20 items-center justify-center rounded-full bg-line text-xl font-bold text-muted sm:size-24",
          active && "ring-2 ring-brand-600"
        )}
      >
        {label.slice(0, 1)}
      </span>
      <span className={cn(active && "font-semibold text-brand-700")}>{label}</span>
    </Link>
  );
}