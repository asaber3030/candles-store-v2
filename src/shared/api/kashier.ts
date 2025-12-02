import crypto from "crypto";

import kashierConfig from "../config/services/kashier.config";
import appConfig from "../config/defaults/app";

import { KashierHashData, KashierInitPaymentData, KashierInitPaymentResult, KashierVerifyPaymentData } from "@/features/payment/model/payment";

export class KashierService {
  private baseUrl: string;
  private merchantId: string;
  private apiKey: string;
  private testMode: boolean;

  constructor() {
    this.baseUrl = kashierConfig.baseUrl;
    this.merchantId = kashierConfig.merchantId;
    this.apiKey = kashierConfig.apiKey;
    this.testMode = kashierConfig.testMode;
  }

  private generateOrderId(userId: number, orderId: number): string {
    return `ORDER_u${userId}_sub${orderId}_${Date.now()}`;
  }

  private generateHash(data: KashierHashData): string {
    const path = `/?payment=${data.merchantId}.${data.orderId}.${data.amount}.${data.currency}`;
    return crypto.createHmac("sha256", this.apiKey).update(path).digest("hex");
  }

  private getRedirectUrl(orderId: number): string {
    return `${appConfig.apiUrl}/payments/${orderId}`;
  }

  public initializePayment(paymentData: KashierInitPaymentData): KashierInitPaymentResult {
    const orderId = this.generateOrderId(paymentData.userId, paymentData.orderId);

    const coreData = {
      merchantId: this.merchantId,
      orderId,
      amount: paymentData.amount,
      currency: paymentData.currency,
    };

    const hash = this.generateHash(coreData);

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
    };

    const paymentUrl = `${this.baseUrl}?${new URLSearchParams(data as Record<string, string>).toString()}`;

    return {
      paymentUrl: paymentUrl,
      formUrl: this.baseUrl,
      formMethod: "GET",
      data,
    };
  }

  public verifyPayment(input: KashierVerifyPaymentData): boolean {
    const { hash, ...coreData } = input;
    const calculatedHash = this.generateHash(coreData);
    return hash === calculatedHash;
  }

  public verifyWebhookSignature(signature: string, data: Record<string, string>): boolean {
    const queryString = Object.entries(data)
      .filter(([key]) => key !== "signature" && key !== "mode")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const calculatedSignature = crypto.createHmac("sha256", this.apiKey).update(queryString).digest("hex");

    return signature === calculatedSignature;
  }
}

export const kashierService = new KashierService();
