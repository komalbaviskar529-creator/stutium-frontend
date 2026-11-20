import Image from "next/image";
import type { Artwork } from "@/components/UploadPreview";

export function LogoOverlay({ artwork, text }: { artwork: Artwork | null; text: string }) {
  const label = text.trim();
  if (!artwork && !label) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
      {artwork && (
        <span className="relative block size-1/3">
          <Image src={artwork.dataUrl} alt="Your uploaded logo on the product" fill unoptimized className="object-contain drop-shadow-lg" />
        </span>
      )}
      {label && (
        <span className="max-w-full truncate rounded-lg bg-black/50 px-3 py-1 text-sm font-bold text-white">{label}</span>
      )}
    </div>
  );
}