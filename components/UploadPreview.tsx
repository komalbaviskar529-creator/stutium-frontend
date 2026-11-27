"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export type Artwork = { dataUrl: string; name: string };

const MAX_BYTES = 5 * 1024 * 1024;
const MAX_SIDE = 360;
const TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];

function loadAndShrink(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const iw = img.naturalWidth || 300;
      const ih = img.naturalHeight || 300;
      const scale = Math.min(1, MAX_SIDE / Math.max(iw, ih));
      const w = Math.max(1, Math.round(iw * scale));
      const h = Math.max(1, Math.round(ih * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      URL.revokeObjectURL(url);
      if (!ctx) {
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };
    img.src = url;
  });
}

type Props = {
  artwork: Artwork | null;
  text: string;
  onArtwork: (a: Artwork | null) => void;
  onText: (t: string) => void;
};

export function UploadPreview({ artwork, text, onArtwork, onText }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!TYPES.includes(file.type)) return setError("Upload a PNG, JPG, SVG or WebP file");
    if (file.size > MAX_BYTES) return setError("File is larger than 5 MB");
    try {
      const dataUrl = await loadAndShrink(file);
      setError("");
      onArtwork({ dataUrl, name: file.name });
    } catch {
      setError("We could not read this image. Try another file.");
    }
  }

  return (
       <div className="min-w-0 space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5">
      <h2 className="flex items-center gap-2 font-bold">
        <ImagePlus className="size-5 text-brand-600" aria-hidden />
        Upload your logo or artwork
      </h2>

      <input
        ref={fileRef}
        type="file"
        accept=".png,.jpg,.jpeg,.svg,.webp"
        aria-label="Upload logo or artwork"
        className="hidden"
        onChange={onFile}
      />

      {artwork ? (
        <div className="flex items-center gap-4 rounded-xl border border-dashed border-brand-600 bg-brand-50 p-3">
          <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white">
            <Image src={artwork.dataUrl} alt="Your uploaded logo" fill unoptimized className="object-contain p-1" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{artwork.name}</p>
            <p className="text-xs text-muted">Preview shown on the product image</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={() => onArtwork(null)} aria-label="Remove uploaded file">
            <Trash2 className="mr-1 size-4" aria-hidden />
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line p-6 text-center">
          <p className="text-sm text-muted">PNG, JPG, SVG or WebP, up to 5 MB</p>
          <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()}>
            Choose file
          </Button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <Input
        label="Add text (optional)"
        name="custom-text"
        maxLength={40}
        placeholder="e.g. Team name"
        value={text}
        onChange={(e) => onText(e.target.value)}
      />
    </div>
  );
}