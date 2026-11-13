import { cn } from "@/lib/cn";

export function ImagePlaceholder({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className={cn("flex items-center justify-center bg-line text-sm text-muted", className)}
    >
      {label ?? "Image"}
    </div>
  );
}