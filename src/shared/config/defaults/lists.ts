import { AnimationEnum, OrderStatusEnum, PaymentMethodTypeEnum, UserRoleEnum } from "@prisma/client"

export const MONTHS = []

export const UserRolesList = Object.values(UserRoleEnum)
export const OrderStatusList = Object.values(OrderStatusEnum)
export const PaymentMethodTypeList = Object.values(PaymentMethodTypeEnum)
export const AnimationList = Object.values(AnimationEnum)
export const AvailableLanguages = ["en", "ar"] as const
