export type KashierHashData = {
  merchantId: string
  orderId: string
  amount: number
  currency: string
}

export type KashierInitPaymentData = {
  orderId: number
  userId: number
  amount: number
  currency: string
}

export type KashierInitPaymentResult = {
  paymentUrl: string
  formUrl: string
  formMethod: "GET"
  data: Record<string, any>
}
export type KashierVerifyPaymentData = { hash: string; amount: number; currency: string; merchantId: string; orderId: string }
