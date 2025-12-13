import { OrderStatusList } from "@/shared/config/defaults"
import { OrderStatusEnum } from "@prisma/client"
import { ShoppingCart, ClipboardCheck, Truck, XCircle, Package } from "lucide-react"
import { useTranslations } from "next-intl"

export function OrderTracker({ currentStatus = OrderStatusEnum.JustOrdered }: { currentStatus: OrderStatusEnum }) {
  const t = useTranslations()

  const getStatusIndex = (status: OrderStatusEnum) => OrderStatusList.indexOf(status)
  const currentIndex = getStatusIndex(currentStatus)

  const getStatusIcon = (status: OrderStatusEnum) => {
    switch (status) {
      case OrderStatusEnum.JustOrdered:
        return <ShoppingCart className="w-6 h-6" />
      case OrderStatusEnum.Reviewed:
        return <ClipboardCheck className="w-6 h-6" />
      case OrderStatusEnum.OutForDelivery:
        return <Truck className="w-6 h-6" />
      case OrderStatusEnum.Refused:
      case OrderStatusEnum.Canceled:
        return <XCircle className="w-6 h-6" />
      case OrderStatusEnum.Delivered:
        return <Package className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <h3 className="text-lg font-semibold mb-2">{t("Order Tracker")}</h3>
      <ol className="flex items-center w-full">
        {OrderStatusList.map((status, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isRefusedOrCanceled = status === OrderStatusEnum.Refused || status === OrderStatusEnum.Canceled

          const animationDelay = `${index * 100}ms`

          return (
            <li
              key={status}
              className={`flex items-center ${index !== OrderStatusList.length - 1 ? "w-full" : ""}`}
              style={{
                animation: `slideIn 0.6s ease-out ${animationDelay} both`,
              }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                    isCompleted || isCurrent ? (isRefusedOrCanceled ? "bg-red-200 text-red-600" : "bg-primary text-primary-foreground") : "bg-gray-200 text-gray-600"
                  } ${isCurrent ? "ring-4 ring-primary/30 scale-110" : ""}`}
                  style={{
                    animation: isCurrent ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
                  }}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {getStatusIcon(status)}
                </div>
                <span className={`mt-2 text-xs transition-colors duration-500 ${isCurrent ? "font-medium" : "font-normal"} ${isRefusedOrCanceled ? "text-red-600" : "text-gray-700"}`}>
                  {t(status)}
                </span>
              </div>
              {index !== OrderStatusList.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-700 ${index < currentIndex ? (isRefusedOrCanceled ? "bg-red-300" : "bg-primary") : "bg-gray-200"}`}
                  style={{
                    animation: index < currentIndex ? "fillLine 0.8s ease-out forwards" : "none",
                    animationDelay: `${(index + 1) * 100}ms`,
                  }}
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
