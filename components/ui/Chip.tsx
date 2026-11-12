import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean };

export function Chip({ selected, className, ...props }: Props) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-brand-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        selected ? "border-brand-600 bg-brand-50 text-brand-700" : "border-line bg-white hover:bg-surface",
        className
      )}
      {...props}
    />
  );
}