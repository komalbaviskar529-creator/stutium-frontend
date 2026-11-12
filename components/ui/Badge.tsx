import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "brand" | "success";
};

const variants = {
  default: "bg-surface text-ink",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-green-50 text-green-700",
};

export function Badge({ variant = "default", className, ...props }: Props) {
  return (
    <span
      className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", variants[variant], className)}
      {...props}
    />
  );
}