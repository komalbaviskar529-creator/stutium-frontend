 "use client";

import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, MapPin, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DeliverySlots } from "@/components/DeliverySlots";
import {
  INVALID_MESSAGE,
  UNSERVICEABLE_MESSAGE,
  getDeliverySlots,
  isValidPincode,
  lookupPincode,
  type Slot,
} from "@/lib/delivery";
import { usePincode } from "@/lib/pincode-context";

type Props = { deliveryDays: number; slot: Slot | null; onSlot: (slot: Slot | null) => void };

export function PincodeCheck({ deliveryDays, slot, onSlot }: Props) {
  const { pincode, setPincode } = usePincode();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState<string | null>(null);

  const active = checked ?? pincode;
  const valid = active ? isValidPincode(active) : true;
  const info = active && valid ? lookupPincode(active) : null;
  const slots = info ? getDeliverySlots(info, deliveryDays) : [];

  useEffect(() => {
    if (pincode) setValue(pincode);
  }, [pincode]);

  useEffect(() => {
    onSlot(null);
  }, [active, onSlot]);

  function check(e: FormEvent) {
    e.preventDefault();
    if (isValidPincode(value) && lookupPincode(value)) {
      setPincode(value);
      setChecked(null);
    } else {
      setChecked(value);
    }
  }

  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:p-5">
      <h2 className="mb-3 flex items-center gap-2 font-bold">
        <MapPin className="size-5 text-brand-600" aria-hidden />
        Check delivery
      </h2>

      <form onSubmit={check} className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <Input
            name="pincode"
            aria-label="Delivery pincode"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter pincode"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
            error={checked !== null && !valid ? INVALID_MESSAGE : undefined}
          />
        </div>
        <Button type="submit" size="lg" className="h-11 shrink-0 px-4">
          Check
        </Button>
      </form>

      {active && valid && !info && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-danger p-3 text-sm text-danger">
          <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {UNSERVICEABLE_MESSAGE}
        </p>
      )}

      {info && (
        <div className="mt-4 space-y-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-green-700">
            <CheckCircle2 className="size-4 shrink-0" aria-hidden />
            Delivering to {info.city}, {info.state}
          </p>
          <DeliverySlots slots={slots} selectedId={slot?.id} onSelect={onSlot} />
          {slot && (
            <p className="text-sm text-muted" aria-live="polite">
              Selected: <span className="font-semibold text-ink">{slot.label}</span>, {slot.dateLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}