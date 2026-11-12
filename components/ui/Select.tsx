import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export function Select({ label, error, id, className, children, ...props }: Props) {
  const selectId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={!!error}
        className={cn(
          "h-11 rounded-lg border bg-white px-3 text-sm",
          "focus-visible:outline-2 focus-visible:outline-brand-600",
          "disabled:bg-surface disabled:opacity-60",
          error ? "border-danger" : "border-line",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}