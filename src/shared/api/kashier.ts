import crypto from "crypto"
import axios from "axios"

import kashierConfig from "../config/services/kashier.config"
import appConfig from "../config/defaults/app"

import { KashierHashData, KashierInitPaymentData, KashierInitPaymentResult, KashierVerifyPaymentData } from "@/features/payment/model/payment"

export class KashierService {
  private baseUrl: string
  private merchantId: string
  private secretKey: string
  private apiKey: string
  private testMode: boolean

  constructor() {
    this.baseUrl = kashierConfig.baseUrl
    this.merchantId = kashierConfig.merchantId!
    this.apiKey = kashierConfig.apiKey!
    this.testMode = kashierConfig.testMode
    this.secretKey = kashierConfig.secretKey!
  }

  private generateOrderId(userId: number, orderId: number): string {
    return `ORDER_u${userId}_sub${orderId}_${Date.now()}`
  }

  private generateHash(data: KashierHashData): string {
    const path = `/?payment=${data.merchantId}.${data.orderId}.${data.amount}.${data.currency}`
    return crypto.createHmac("sha256", this.apiKey).update(path).digest("hex")
  }

  private getRedirectUrl(orderId: number): string {
    return `${appConfig.apiUrl}/payments/${orderId}`
  }

  public initializePayment(paymentData: KashierInitPaymentData): KashierInitPaymentResult {
    const orderId = this.generateOrderId(paymentData.userId, paymentData.orderId)

    const coreData = {
      merchantId: this.merchantId,
      orderId,
      amount: paymentData.amount,
      currency: paymentData.currency,
    }

    const hash = this.generateHash(coreData)

    const data: Record<string, string | number> = {
      merchantId: this.merchantId,
      orderId,
      mode: this.testMode ? "test" : "live",
      amount: paymentData.amount,
      currency: paymentData.currency,
      hash,
      merchantRedirect: this.getRedirectUrl(paymentData.orderId),
      allowedMethods: "card,wallet",
      display: "en",
    }

    const paymentUrl = `${this.baseUrl}?${new URLSearchParams(data as Record<string, string>).toString()}`

    return {
      paymentUrl: paymentUrl,
      formUrl: this.baseUrl,
      formMethod: "GET",
      data,
    }
  }

  public verifyPayment(input: KashierVerifyPaymentData): boolean {
    const { hash, ...coreData } = input
    const calculatedHash = this.generateHash(coreData)
    return hash === calculatedHash
  }

  public verifyWebhookSignature(signature: string, data: Record<string, string>): boolean {
    const queryString = Object.entries(data)
      .filter(([key]) => key !== "signature" && key !== "mode")
      .map(([key, value]) => `${key}=${value}`)
      .join("&")

    const calculatedSignature = crypto.createHmac("sha256", this.apiKey).update(queryString).digest("hex")

    return signature === calculatedSignature
  }

  public async refundPayment(kashierOrderId: string, amount: number): Promise<boolean> {
    console.log({ kashierConfig })
    try {
      const baseUrl = "https://test-fep.kashier.io/v3/orders"
      const url = `${baseUrl}/${kashierOrderId}`

      const payload = {
        apiOperation: "REFUND",
        reason: "User cancelled",
        transaction: {
          amount,
        },
      }

      const response = await axios.put(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: this.secretKey,
        },
      })

      console.log("Kashier refund response:", response.data)

      return response.data?.status === "SUCCESS"
    } catch (error: any) {
      console.error("Kashier Refund Error:", error?.response?.data || error)
      return false
    }
  }
}

export const kashierService = new KashierService()
