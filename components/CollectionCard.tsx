 import Link from "next/link";
import { SmartImage } from "@/components/SmartImage";

type Props = { label: string; href: string; image: string };

export function CollectionCard({ label, href, image }: Props) {
  return (
    <Link
      href={href}
      className="group relative block aspect-square overflow-hidden rounded-xl shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-brand-600 sm:rounded-2xl"
    >
      <SmartImage
        src={image}
        alt={label}
        sizes="(min-width: 1024px) 200px, 33vw"
        seed={label}
        className="transition duration-500 group-hover:scale-110"
      />
      <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-2 text-xs font-bold leading-tight text-white sm:p-4 sm:text-base">
        {label}
      </span>
    </Link>
  );
}