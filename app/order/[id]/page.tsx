import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/OrderConfirmation";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Order confirmed | Stutium" };

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <OrderConfirmation id={id} />
    </div>
  );
}