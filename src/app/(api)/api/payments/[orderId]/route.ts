import prisma from "@/shared/api/prisma"
import appConfig from "@/shared/config/defaults/app"

import { verifyWebhookSignature } from "@/features/payment/api/payment.api"
import { response } from "@/shared/lib/api"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const url = new URL(req.url)
    const query = Object.fromEntries(url.searchParams.entries())

    const id = +(await params).orderId
    const signature = query.signature

    if (isNaN(id)) return response({ message: "Invalid order ID", status: 400 })

    const order = await prisma.order.findUnique({
      where: { id: Number((await params).orderId) }
    })
    if (!order) return response({ message: "Order not found", status: 404 })

    if (!signature)
      return response({
        message: "Signature is required",
        status: 400
      })

    const { signature: _removed, ...data } = query

    const isValid = verifyWebhookSignature(signature, data)
    if (!isValid)
      return response({
        message: "Invalid signature",
        status: 400
      })

    if (query.paymentStatus === "SUCCESS") {
      const redirectUrl = `${appConfig.appUrl}/payments/success?${url.searchParams.toString()}`
      await prisma.order.update({
        where: { id },
        data: {
          paymentStatus: "paid",
          kashierResponse: JSON.stringify(query),
          kashierOrderId: query.orderId,
          kashierTxnId: query.transactionId,
          kashierPaymentId: query.orderReference,
          kashierSignature: signature,
          merchantOrderId: query.merchantOrderId
        }
      })
      return NextResponse.redirect(redirectUrl)
    } else {
      const redirectUrl = `${appConfig.appUrl}/payments/error?${url.searchParams.toString()}`
      await prisma.order.update({
        where: { id },
        data: {
          paymentStatus: "failed",
          kashierResponse: JSON.stringify(query),
          kashierOrderId: query.orderId,
          kashierTxnId: query.transactionId,
          kashierPaymentId: query.orderReference,
          kashierSignature: signature,
          merchantOrderId: query.merchantOrderId
        }
      })
      return NextResponse.redirect(redirectUrl)
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 })
  }
}
