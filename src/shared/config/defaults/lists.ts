import { AnimationEnum, OrderStatusEnum, PaymentMethodTypeEnum, UserRoleEnum, AllowedPaymentMethodEnum } from "@prisma/client"
import { userRoutes } from "../routes"

export const MONTHS = []

export const UserRolesList = Object.values(UserRoleEnum)
export const OrderStatusList = Object.values(OrderStatusEnum)
export const PaymentMethodTypeList = Object.values(PaymentMethodTypeEnum)
export const AnimationList = Object.values(AnimationEnum)
export const AllowedPaymentMethodsList = Object.values(AllowedPaymentMethodEnum)
export const AvailableLanguages = ["en", "ar"] as const

export const SocialLogos = {
  facebook: "/images/social/facebook.svg",
  twitter: "/images/social/x.svg",
  instagram: "/images/social/instagram.svg",
  snapchat: "/images/social/snapchat.svg",
  tiktok: "/images/social/tiktok.svg",
  youtube: "/images/social/youtube.svg",
}

export const NavbarItems = [
  {
    name: "Home",
    href: userRoutes.home,
  },
  {
    name: "About",
    href: userRoutes.about,
  },

  {
    name: "Shop Now",
    href: userRoutes.shop,
  },
  {
    name: "Offers",
    href: userRoutes.offers,
  },

]
