import { KashierService } from "@/shared/api/kashier"
import { KashierInitPaymentData, KashierInitPaymentResult } from "../model/payment"

export function generatePaymentUrl({ orderId, userId, amount, currency }: KashierInitPaymentData): KashierInitPaymentResult {
  const service = new KashierService()
  return service.initializePayment({
    orderId,
    userId,
    amount,
    currency
  })
}

export function verifyWebhookSignature(signature: string, data: TObject): boolean {
  const service = new KashierService()
  return service.verifyWebhookSignature(signature, data)
}
