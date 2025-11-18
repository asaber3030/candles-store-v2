"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { adminRoutes } from "@/shared/config/routes"
import { getOrderStatusLabel } from "@/shared/lib/functions"
import { OrderStatusEnum } from "@prisma/client"
import { Clock, CheckCircle, AlertCircle, Package, Truck, XIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

interface OrderStatusProps {
  items: {
    status: string
    count: number
  }[]
}

const statusConfig: Record<string, { icon: React.ReactNode; bgColor: string; textColor: string; accentColor: string }> = {
  JustOrdered: {
    icon: <Clock className='w-6 h-6' />,
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    textColor: "text-amber-700 dark:text-amber-300",
    accentColor: "bg-amber-500/20 dark:bg-amber-500/10"
  },
  Delivered: {
    icon: <CheckCircle className='w-6 h-6' />,
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    textColor: "text-emerald-700 dark:text-emerald-300",
    accentColor: "bg-emerald-500/20 dark:bg-emerald-500/10"
  },
  Refused: {
    icon: <XIcon className='w-6 h-6' />,
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    textColor: "text-orange-700 dark:text-orange-300",
    accentColor: "bg-orange-500/20 dark:bg-orange-500/10"
  },
  OutForDelivery: {
    icon: <Truck className='w-6 h-6' />,
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    textColor: "text-purple-700 dark:text-purple-300",
    accentColor: "bg-purple-500/20 dark:bg-purple-500/10"
  },
  Canceled: {
    icon: <AlertCircle className='w-6 h-6' />,
    bgColor: "bg-red-50 dark:bg-red-950/20",
    textColor: "text-red-700 dark:text-red-300",
    accentColor: "bg-red-500/20 dark:bg-red-500/10"
  }
}

const defaultConfig = {
  icon: <Package className='w-6 h-6' />,
  bgColor: "bg-slate-50 dark:bg-slate-900/20",
  textColor: "text-slate-700 dark:text-slate-300",
  accentColor: "bg-slate-500/20 dark:bg-slate-500/10"
}

export function OrderStatusCountCard({ items }: OrderStatusProps) {
  const totalOrders = items.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className='space-y-3 grid xl:grid-cols-3 grid-cols-1 gap-2'>
      {items.map((status) => {
        const config = statusConfig[status.status] || defaultConfig

        return (
          <Link
            key={status.status}
            href={adminRoutes.orders.withStatus(status.status)}
            className={`
                  flex items-center shadow-md  justify-between p-4 rounded-lg
                  transition-all duration-200 hover:shadow-md
                  border  hover:border-primary/20
                  ${config.bgColor}
                  group cursor-pointer
                `}
          >
            <div className='flex items-center gap-4 flex-1'>
              <div className={`p-2.5 rounded-lg ${config.accentColor} text-foreground`}>{config.icon}</div>
              <div>
                <p className={`text-sm font-semibold ${config.textColor}`}>{getOrderStatusLabel(status.status as OrderStatusEnum)}</p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  {status.count} {status.count === 1 ? "order" : "orders"}
                </p>
              </div>
            </div>

            <div className='text-right'>
              <p className='text-2xl font-bold text-foreground'>{status.count}</p>
              <p className='text-xs text-muted-foreground mt-1'>{totalOrders > 0 ? Math.round((status.count / totalOrders) * 100) : 0}%</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
