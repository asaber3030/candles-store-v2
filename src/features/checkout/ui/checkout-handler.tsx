"use client";
import appConfig from "@/shared/config/defaults/app";

import { useState, useMemo, useContext } from "react";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/features/cart/model/cart.store";
import { useCheckCoupon } from "@/entities/coupon/hooks/useCoupon";

import { formatCurrency, safeParseNumber } from "@/shared/lib/numbers";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { CreateUserAddressModal } from "@/features/address/ui/create-modal";
import { PaymentMethodTypeEnum } from "@prisma/client";
import { AppSettingsContext } from "@/shared/providers/settings.provider";
import { CheckoutButton } from "./checkout-button";
import { FullAddress } from "@/entities/user/model/user";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";

type Props = {
  addresses: FullAddress[];
  defaultAddress: FullAddress | null;
};

export const CheckoutHandler = ({ addresses, defaultAddress }: Props) => {
  const t = useTranslations();
  const settings = useContext(AppSettingsContext);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(defaultAddress?.id ?? null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodTypeEnum>(settings?.allowedPaymentMethod === "Both" ? "Card" : settings?.allowedPaymentMethod || "Card");
  const [couponCode, setCouponCode] = useState<string>("");

  const { items, getTotal } = useCartStore();
  const { coupon, isCheckCouponLoading, isCheckCouponRefetching, refetchCheckCoupon } = useCheckCoupon(couponCode);

  const [appliedCoupon, setAppliedCoupon] = useState<typeof coupon | null>(null);

  const address = addresses.find((addr) => addr.id === selectedAddressId);

  const handleApplyCoupon = async () => {
    const result = await refetchCheckCoupon();

    if (result.data) {
      setAppliedCoupon(result.data);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const deliveryFees = useMemo(() => {
    if (!address) return 0;
    return safeParseNumber(address.city.price + address.country.price, appConfig.defaultDeliveryFees);
  }, [address]);

  const subtotalAfterDiscount = useMemo(() => {
    const total = getTotal();
    return appliedCoupon ? total - (total * appliedCoupon.discount) / 100 : total;
  }, [appliedCoupon, getTotal]);

  const totalAmount = useMemo(() => {
    return subtotalAfterDiscount + deliveryFees;
  }, [subtotalAfterDiscount, deliveryFees]);

  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="border-b text-xl font-semibold mb-4">{t("Order Summary")}</p>

        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>{t("Items")}:</span>
            <span>{items.length}</span>
          </li>

          <li className="flex justify-between">
            <span>{t("Total Before")}:</span>
            <span className="text-green-700 font-semibold">{formatCurrency(getTotal())}</span>
          </li>

          {appliedCoupon && (
            <li className="flex justify-between">
              <span>
                {t("Coupon Discount")} ({appliedCoupon.name} - {appliedCoupon.discount}%):
              </span>
              <span className="text-green-700 font-semibold">- {formatCurrency((getTotal() * appliedCoupon.discount) / 100)}</span>
            </li>
          )}

          <li className="flex justify-between">
            <span>{t("Sub Total")}:</span>
            <span className="text-green-700 font-semibold">{formatCurrency(subtotalAfterDiscount)}</span>
          </li>

          {address && (
            <li className="flex justify-between">
              <span>{t("Delivery Fees")}:</span>
              <span className="text-green-700 font-semibold">{formatCurrency(deliveryFees)}</span>
            </li>
          )}

          <li className="flex justify-between">
            <span>{t("Total Amount")}:</span>
            <span className="text-green-700 font-semibold">{formatCurrency(totalAmount)}</span>
          </li>
        </ul>
      </div>

      {/* Address Section */}
      {addresses.length === 0 ? (
        <div className="bg-white p-4 rounded-md shadow-md space-y-2">
          <p>{t("No shipping addresses found. Please add an address to proceed with checkout.")}</p>
          <CreateUserAddressModal />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md shadow-md space-y-3">
          <p className="border-b text-xl font-semibold mb-4">{t("Shipping Address")}</p>

          <Label>{t("Shipping Address")}</Label>

          <Select onValueChange={(value) => setSelectedAddressId(Number(value))} defaultValue={selectedAddressId?.toString()}>
            <SelectTrigger>
              <SelectValue placeholder={t("Address")} />
            </SelectTrigger>

            <SelectContent>
              {addresses.map((addr) => (
                <SelectItem key={addr.id} value={String(addr.id)}>
                  {addr.streetName}, {addr.city.name}, {addr.country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Coupon Section */}
      <div className="bg-white p-4 rounded-md shadow-md space-y-2">
        <p className="border-b text-xl font-semibold mb-4">{t("Coupon")}</p>

        <div className="flex gap-2">
          <Input type="text" placeholder={t("Enter coupon code")} value={couponCode} onChange={(e) => setCouponCode(e.target.value)} disabled={!!appliedCoupon} />

          {!appliedCoupon ? (
            <Button disabled={isCheckCouponLoading || isCheckCouponRefetching || couponCode.length === 0} onClick={handleApplyCoupon}>
              {isCheckCouponLoading || isCheckCouponRefetching ? t("Checking") : t("Apply")}
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleRemoveCoupon}>
              {t("Remove")}
            </Button>
          )}
        </div>

        {appliedCoupon ? (
          <p className="text-green-600">
            {t("Coupon applied")}: <b>{appliedCoupon.name}</b> - <b>{appliedCoupon.discount}%</b>
          </p>
        ) : (
          couponCode.length > 0 && !coupon && <p className="text-red-600">{t("Invalid coupon code")}</p>
        )}
      </div>

      {/* Payment Section */}
      <div className="bg-white p-4 rounded-md shadow-md space-y-2">
        <p className="border-b text-xl font-semibold mb-4">{t("Payment Method")}</p>

        <RadioGroup defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethodTypeEnum)} className="space-y-2">
          {settings?.allowedPaymentMethod == "Both" && (
            <>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Card" id="Card" />
                <Label htmlFor="Card">{t("Card")}</Label>
              </div>

              <div className="flex items-center gap-2">
                <RadioGroupItem value="Cash" id="Cash" />
                <Label htmlFor="Cash">{t("Cash on Delivery")}</Label>
              </div>
            </>
          )}
          {settings?.allowedPaymentMethod == "Card" && (
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Card" id="Card" />
              <Label htmlFor="Card">{t("Card")}</Label>
            </div>
          )}
          {settings?.allowedPaymentMethod == "Cash" && (
            <div className="flex items-center gap-2">
              <RadioGroupItem value="Cash" id="Cash" />
              <Label htmlFor="Cash">{t("Cash on Delivery")}</Label>
            </div>
          )}
        </RadioGroup>

        <Separator className="my-4" />

        {address && (
          <CheckoutButton
            appliedCoupon={{
              name: appliedCoupon?.name ?? "",
              discount: appliedCoupon?.discount ?? 0,
            }}
            deliveryFees={deliveryFees}
            selectedAddressId={selectedAddressId}
            paymentMethod={paymentMethod}
          />
        )}
      </div>
    </div>
  );
};
