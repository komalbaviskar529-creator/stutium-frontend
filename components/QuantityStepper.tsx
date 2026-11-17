"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

const MAX = 10000;

type Props = { value: number; min: number; onChange: (n: number) => void };

export function QuantityStepper({ value, min, onChange }: Props) {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const clamp = (n: number) => Math.min(Math.max(n, min), MAX);
  const btn =
    "flex size-11 items-center justify-center bg-white text-ink hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div>
      <p className="mb-2 text-sm font-bold">Quantity</p>
      <div className="flex items-center gap-3">
        <div className="inline-flex overflow-hidden rounded-xl ring-1 ring-line">
          <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(clamp(value - 1))} className={btn}>
            <Minus className="size-4" aria-hidden />
          </button>
          <input
            type="text"
            inputMode="numeric"
            aria-label="Quantity"
            value={text}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setText(raw);
              const n = parseInt(raw, 10);
              if (!Number.isNaN(n) && n >= min && n <= MAX) onChange(n);
            }}
            onBlur={() => {
              const n = parseInt(text, 10);
              const c = Number.isNaN(n) ? min : clamp(n);
              setText(String(c));
              onChange(c);
            }}
            className="w-20 border-x border-line bg-white text-center text-sm font-bold focus-visible:outline-2 focus-visible:outline-brand-600"
          />
          <button type="button" aria-label="Increase quantity" disabled={value >= MAX} onClick={() => onChange(clamp(value + 1))} className={btn}>
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
        <p className="text-sm text-muted">Minimum order: {min}</p>
      </div>
    </div>
  );
}