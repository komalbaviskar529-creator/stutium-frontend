 import type { Totals } from "@/lib/cart-types";
import { rupeesExact } from "@/lib/format";

function Row({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={green ? "font-semibold text-green-700" : "font-semibold"}>{value}</dd>
    </div>
  );
}

type Props = { totals: Totals; coupon?: string };

export function PriceBreakdown({ totals, coupon }: Props) {
  return (
    <div>
      <dl className="space-y-3 text-sm">
        <Row label="Subtotal" value={rupeesExact(totals.subtotal)} />
        {totals.discount > 0 && (
          <Row label={`Coupon ${coupon ?? ""}`} value={`-${rupeesExact(totals.discount)}`} green />
        )}
        <Row label="Delivery" value={totals.delivery > 0 ? rupeesExact(totals.delivery) : "Free"} />
        <Row label="GST (18%)" value={rupeesExact(totals.gst)} />
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
        <span className="font-bold">Total</span>
        <span className="text-2xl font-extrabold">{rupeesExact(totals.total)}</span>
      </div>
      {totals.discount > 0 && (
        <p className="mt-2 text-sm font-semibold text-green-700">You save {rupeesExact(totals.discount)}</p>
      )}
    </div>
  );
}