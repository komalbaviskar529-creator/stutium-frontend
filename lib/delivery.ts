import pincodesData from "@/data/pincodes.json";

export type PincodeInfo = { pincode: string; city: string; state: string; extraDays: number };

export type Slot = {
  id: string;
  label: string;
  dateLabel: string;
  fee: number;
  express: boolean;
};

export const EXPRESS_FEE = 149;
export const UNSERVICEABLE_MESSAGE = "Sorry, we don't deliver to this pincode yet.";
export const INVALID_MESSAGE = "Enter a valid 6-digit pincode";

const pincodes = pincodesData as PincodeInfo[];

export const isValidPincode = (v: string) => /^\d{6}$/.test(v);
export const lookupPincode = (v: string) => pincodes.find((p) => p.pincode === v) ?? null;

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

const fmt = (d: Date) =>
  d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function getDeliverySlots(info: PincodeInfo, productDays: number, today = new Date()): Slot[] {
  const earliest = productDays + info.extraDays;
  const slots: Slot[] = [];

  if (earliest <= 1) {
    slots.push({
      id: `${key(today)}-express`,
      label: "Today",
      dateLabel: `${fmt(today)} · Express`,
      fee: EXPRESS_FEE,
      express: true,
    });
  }

  for (let i = 0; i < 3; i++) {
    const offset = Math.max(earliest, 1) + i;
    const date = addDays(today, offset);
    slots.push({
      id: key(date),
      label: offset === 1 ? "Tomorrow" : fmt(date),
      dateLabel: offset === 1 ? fmt(date) : "Standard",
      fee: 0,
      express: false,
    });
  }
  return slots;
}

export const slotText = (s: Slot) =>
  `${s.label}${s.dateLabel && s.dateLabel !== "Standard" ? ` (${s.dateLabel})` : ""}`;