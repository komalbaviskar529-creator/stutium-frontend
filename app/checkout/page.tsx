 import type { Metadata } from "next";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = { title: "Checkout | Stutium" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8">
      <CheckoutView />
    </div>
  );
}