import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
};

export function Textarea({ label, error, id, className, ...props }: Props) {
  const fieldId = id ?? props.name;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={cn(
          "rounded-lg border bg-white p-3 text-sm placeholder:text-muted",
          "focus-visible:outline-2 focus-visible:outline-brand-600",
          error ? "border-danger" : "border-line",
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${fieldId}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}