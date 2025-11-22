"use server"

import { getCurrentUser } from "@/entities/auth/api/auth.api"
import prisma from "@/shared/api/prisma"

export async function getDeliveryCompanyOrdersStatsCount() {
  const currentCompany = await getCurrentUser()
  if (!currentCompany) throw new Error("Unauthorized")
  const deliveredCount = prisma.order.count({
    where: { companyId: currentCompany.id, deliveredAt: { not: null } }
  })
  const undeliveredCount = prisma.order.count({
    where: { deliveredAt: null, companyId: currentCompany.id }
  })

  const [delivered, undelivered] = await Promise.all([deliveredCount, undeliveredCount])
  return {
    delivered,
    undelivered
  }
}

export async function getDeliveryTotalIncome() {
  const currentCompany = await getCurrentUser()
  if (!currentCompany) throw new Error("Unauthorized")
  const completedIncome = prisma.order.aggregate({
    where: {
      deliveredAt: { not: null },
      companyId: currentCompany.id
    },
    _sum: {
      deliveryValue: true
    }
  })
  const pendingIncome = prisma.order.aggregate({
    where: {
      deliveredAt: null,
      companyId: currentCompany.id
    },
    _sum: {
      deliveryValue: true
    }
  })
  const [completed, pending] = await Promise.all([completedIncome, pendingIncome])
  return {
    completed: completed._sum.deliveryValue || 0,
    pending: pending._sum.deliveryValue || 0
  }
}
