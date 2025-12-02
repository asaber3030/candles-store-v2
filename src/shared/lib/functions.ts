import { FullSection } from "@/entities/section/model/section"
import { OrderStatusEnum, UserRoleEnum } from "@prisma/client"

export function normalizeLatex(input: string): string {
  return input
    .replace(/\\\\/g, "\\")
    .replace(/\\bigm\{\|}/g, "\\Big|")
    .replace(/\\bigm\{\s*\|}/g, "\\Big|")
}

export function getErrorMessage(error: unknown, message: string): string {
  return error instanceof Error ? error.message : message
}

export function extractCloudinaryPublicId(path: string): string {
  let cleanedPath = path
  try {
    if (path.startsWith("http")) {
      const url = new URL(path)
      cleanedPath = url.pathname

      cleanedPath = cleanedPath.replace(/^\/[^\/]+\/image\/upload\/v\d+\//, "")
      cleanedPath = cleanedPath.replace(/^\/+/, "")
    }
  } catch {}
  return cleanedPath.replace(/\.[^/.]+$/, "")
}

export function getOrderStatusVariant(status: OrderStatusEnum): string {
  switch (status) {
    case OrderStatusEnum.JustOrdered:
      return "secondary"
    case OrderStatusEnum.Reviewed:
      return "info"
    case OrderStatusEnum.OutForDelivery:
      return "indigo"
    case OrderStatusEnum.Refused:
      return "warning"
    case OrderStatusEnum.Delivered:
      return "success"
    case OrderStatusEnum.Canceled:
      return "destructive"
    default:
      return "outline"
  }
}

export function getRoleVariant(role: UserRoleEnum): string {
  switch (role) {
    case UserRoleEnum.admin:
      return "success"
    case UserRoleEnum.user:
      return "info"
    case UserRoleEnum.deliveryCompany:
      return "indigo"
  }
}

export function getRoleLabel(role: UserRoleEnum): string {
  switch (role) {
    case UserRoleEnum.admin:
      return "Admin"
    case UserRoleEnum.user:
      return "User"
    case UserRoleEnum.deliveryCompany:
      return "Delivery Company"
  }
}

export function getOrderStatusLabel(status: OrderStatusEnum): string {
  switch (status) {
    case OrderStatusEnum.JustOrdered:
      return "Just Ordered"
    case OrderStatusEnum.Reviewed:
      return "Reviewed"
    case OrderStatusEnum.OutForDelivery:
      return "Out for Delivery"
    case OrderStatusEnum.Refused:
      return "Refused"
    case OrderStatusEnum.Delivered:
      return "Delivered"
    case OrderStatusEnum.Canceled:
      return "Canceled"
  }
}

export function createPaginatedResponse<T>(products: T[], total: number, page: number = 1, pageSize: number = 10): PaginatedResult<T> {
  return {
    data: products,
    pagination: {
      page,
      pageSize,
      hasNextPage: page * pageSize < total,
      hasPrevPage: page > 1,
      total,
      pages: Math.ceil(total / pageSize),
    },
  }
}

export function isVideoExtension(extension: string | null | undefined): boolean {
  if (!extension) return false
  const lowerCaseExt = extension.toLowerCase()
  return ["mp4", "mov", "webm", "ogg", "avi"].includes(lowerCaseExt)
}

export function filterSections(key: string, sections: FullSection[]) {
  return sections.find((i) => i.name === key)
}
