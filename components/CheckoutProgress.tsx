import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const STEPS = ["Address", "Delivery", "Payment"];

export function CheckoutProgress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <ol aria-label="Checkout progress" className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <li key={label} aria-current={active ? "step" : undefined} className="flex items-center gap-2 sm:gap-4">
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-sm font-bold ring-1",
                done || active ? "btn-gradient ring-0" : "bg-white text-muted ring-line"
              )}
            >
              {done ? <Check className="size-5" aria-hidden /> : n}
            </span>
            <span className={cn("text-sm font-semibold", active ? "text-ink" : "hidden text-muted sm:inline")}>
              {label}
            </span>
            {n < STEPS.length && (
              <span aria-hidden className={cn("h-0.5 w-6 rounded sm:w-16", done ? "bg-brand-600" : "bg-line")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}