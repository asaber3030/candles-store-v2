import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { FailedAnimation } from "@/shared/components/animations/payment-error";
import { verifyWebhookSignature } from "@/features/payment/api/payment.api";

type Props = {
  searchParams: TSearchParams;
};

export default async function ErrorPayment({ searchParams }: Props) {
  const { amount, currency, paymentStatus, signature } = await searchParams;

  if (!signature) {
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
    <div className="min-h-screen from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated Failed Icon */}
        <div className="mb-8">
          <FailedAnimation />
        </div>

        {/* Content Card */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Payment Failed</h1>
            <p className="text-base text-muted-foreground">We couldn't process your payment. Please try again or use another method.</p>
          </div>

          {/* Error Details */}
          <div className="bg-error/5 rounded-lg border border-error/20 p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-error/20">
              <span className="text-muted-foreground text-sm">Error Code</span>
              <span className="font-mono font-semibold text-error">{paymentStatus}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-error/20">
              <span className="text-muted-foreground text-sm">Amount</span>
              <span className="text-xl font-bold text-foreground">
                {amount} {currency}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Status</span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error/10 text-error text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="captalize">{paymentStatus}</span>
              </span>
            </div>
          </div>

          {/* Troubleshooting Tips */}
          <div className="bg-muted/30 rounded-lg border border-border p-4 text-left">
            <p className="text-sm font-semibold text-foreground mb-3">Possible reasons:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">•</span>
                <span>Card has been declined by your bank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">•</span>
                <span>Insufficient funds or credit limit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">•</span>
                <span>Incorrect card details or expiry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-0.5">•</span>
                <span>Network or temporary issue</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Link href="/checkout" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base h-10 rounded-lg font-semibold">
                Try Again
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full text-base h-10 rounded-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
