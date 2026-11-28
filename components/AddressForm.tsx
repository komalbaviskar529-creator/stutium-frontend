 "use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { lookupPincode } from "@/lib/delivery";
import { addressSchema, type AddressValues } from "@/lib/validation";

type Props = { defaultValues: AddressValues; onSubmit: (values: AddressValues) => void };

export function AddressForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
    mode: "onBlur",
  });

  const pincode = watch("pincode");

  useEffect(() => {
    const info = /^\d{6}$/.test(pincode ?? "") ? lookupPincode(pincode) : null;
    if (info && !getValues("city")) setValue("city", info.city, { shouldValidate: true });
  }, [pincode, getValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="min-w-0 space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-line sm:space-y-5 sm:p-6"
    >
      <h2 className="text-lg font-extrabold sm:text-xl">Delivery address</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Full name" autoComplete="name" placeholder="Enter your full name" error={errors.name?.message} {...register("name")} />
        <Input
          label="Phone number"
          type="tel"
          inputMode="tel"
          maxLength={10}
          autoComplete="tel"
          placeholder="10-digit mobile number"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="GSTIN (optional)"
          maxLength={15}
          placeholder="15-character GSTIN"
          error={errors.gstin?.message}
          {...register("gstin")}
        />
      </div>

      <Textarea
        label="Address"
        rows={3}
        autoComplete="street-address"
        placeholder="House no., street, area"
        error={errors.address?.message}
        {...register("address")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Pincode"
          inputMode="numeric"
          maxLength={6}
          autoComplete="postal-code"
          placeholder="6-digit pincode"
          error={errors.pincode?.message}
          {...register("pincode")}
        />
        <Input label="City" autoComplete="address-level2" placeholder="City" error={errors.city?.message} {...register("city")} />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Continue to delivery
      </Button>
    </form>
  );
}