"use server"

import prisma from "@/shared/api/prisma"
import { TDashboardAppCount } from "../model/dashboard"
import { OrderStatusEnum } from "@prisma/client"

export async function getAppCounts() {
  const result: any = await prisma.$queryRawUnsafe(`
  SELECT
    (SELECT COUNT(*) FROM users) AS users,
    (SELECT COUNT(*) FROM users WHERE role = 'deliveryCompany') AS deliveryCompanies,
    (SELECT COUNT(*) FROM users WHERE role = 'admin') AS admins,
    (SELECT COUNT(*) FROM categories) AS categories,
    (SELECT COUNT(*) FROM products) AS products,
    (SELECT COUNT(*) FROM coupons) AS coupons,
    (SELECT COUNT(*) FROM orders) AS orders,
    (SELECT COUNT(*) FROM product_reviews) AS reviews,
    (SELECT COUNT(*) FROM coutries) AS countries,
    (SELECT COUNT(*) FROM cities) AS cities;
`)
  return result[0] as TDashboardAppCount
}

export async function getOrdersStatusCount() {
  const result = await prisma.order.groupBy({
    by: ["status"],
    _count: {
      status: true
    }
  })
  return result.map((item) => ({
    status: item.status,
    count: item._count.status
  }))
}

export async function getOrdersStatsCount() {
  const unassingedCount = prisma.order.count({
    where: { companyId: null }
  })
  const undeliveredCount = prisma.order.count({
    where: { deliveredAt: null }
  })

  const [unassinged, undelivered] = await Promise.all([unassingedCount, undeliveredCount])
  return {
    unassinged,
    undelivered
  }
}
