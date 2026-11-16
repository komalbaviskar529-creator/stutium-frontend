import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { label: string; href: string; icon: LucideIcon; gradient: string };

export function CollectionCard({ label, href, icon: Icon, gradient }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-brand-600"
    >
      <span
        className={cn(
          "flex aspect-square w-full items-center justify-center rounded-xl bg-linear-to-br",
          gradient
        )}
      >
        <Icon className="size-10 text-white transition group-hover:scale-110" aria-hidden />
      </span>
      <span className="font-semibold">{label}</span>
    </Link>
  );
}