"use client";

import { useState, type FormEvent } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { INVALID_MESSAGE, UNSERVICEABLE_MESSAGE, isValidPincode, lookupPincode } from "@/lib/delivery";
import { usePincode } from "@/lib/pincode-context";

export function PincodeButton() {
  const { pincode, setPincode } = usePincode();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const info = pincode ? lookupPincode(pincode) : null;

  function apply(e: FormEvent) {
    e.preventDefault();
    if (!isValidPincode(value)) return setError(INVALID_MESSAGE);
    if (!lookupPincode(value)) return setError(UNSERVICEABLE_MESSAGE);
    setPincode(value);
    setError("");
    setOpen(false);
  }

  return (
    <div className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium hover:border-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600"
      >
        <MapPin className="size-4 text-brand-600" aria-hidden />
        Deliver to: <span className="font-bold">{pincode || "Pincode"}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose delivery pincode"
          className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-line"
        >
          <form onSubmit={apply} className="space-y-3">
            <Input
              label="Delivery pincode"
              name="header-pincode"
              inputMode="numeric"
              maxLength={6}
              placeholder="e.g. 411001"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
              error={error}
            />
            {info && !error && (
              <p className="text-xs text-muted">
                Currently delivering to {info.city}, {info.state}
              </p>
            )}
            <Button type="submit" className="w-full">
              Apply
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}