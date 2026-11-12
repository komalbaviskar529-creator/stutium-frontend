import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, id, className, ...props }: Props) {
  const inputId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "h-11 rounded-lg border bg-white px-3 text-sm placeholder:text-muted",
          "focus-visible:outline-2 focus-visible:outline-brand-600",
          "disabled:bg-surface disabled:opacity-60",
          error ? "border-danger" : "border-line",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}