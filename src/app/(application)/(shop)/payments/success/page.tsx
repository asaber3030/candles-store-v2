import React from "react";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { SuccessAnimation } from "@/shared/components/animations/payment-success";
import { verifyWebhookSignature } from "@/features/payment/api/payment.api";

type Props = {
  searchParams: TSearchParams;
};

export default async function SuccessPayment({ searchParams }: Props) {
  const { amount, currency, merchantOrderId, paymentStatus, signature } = await searchParams;

  if (!signature || verifyWebhookSignature(signature, await searchParams) === false) {
    return (
      <div className="min-h-screen from-background via-muted/30 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Invalid Access</h1>
          <p className="text-base text-muted-foreground mb-6">
            You have accessed this page incorrectly. Please return to the checkout page to complete your payment.
          </p>
          <Link href="/checkout" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base h-10 rounded-lg font-semibold">
              Go to Checkout
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated Success Icon */}
        <div className="mb-8">
          <SuccessAnimation />
        </div>

        {/* Content Card */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Payment Successful!</h1>
            <p className="text-base text-muted-foreground">Your transaction has been processed successfully</p>
          </div>

          {/* Order Details */}
          <div className="bg-card rounded-lg border border-border p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground text-sm">Order ID</span>
              <span className="font-mono font-semibold text-foreground">{merchantOrderId}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground text-sm">Amount</span>
              <span className="text-xl font-bold text-success">
                {amount} {currency}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="capitalize">{paymentStatus}</span>
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-secondary/5 rounded-lg border border-secondary/20 p-4 text-left">
            <p className="text-sm font-semibold text-foreground mb-3">What's next?</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>A confirmation email has been sent to your inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Access your order details in your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success mt-0.5">✓</span>
                <span>Your product will be delivered within 24 hours</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Link href="/" className="block">
              <Button className="w-full bg-success hover:bg-success/90 text-success-foreground text-base h-10 rounded-lg font-semibold">
                Back to Home
              </Button>
            </Link>
            <Link href="/profile/orders" className="block">
              <Button variant="outline" className="w-full text-base h-10 rounded-lg">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
