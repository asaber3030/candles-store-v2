"use server"

import prisma from "@/shared/api/prisma"

import { createPaginatedResponse, getErrorMessage } from "@/shared/lib/functions"
import { generatePaymentUrl } from "@/features/payment/api/payment.api"
import { safeParseNumber } from "@/shared/lib/numbers"
import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { actionResponse } from "@/shared/lib/api"

import { OrderStatusEnum, Prisma, UserRoleEnum } from "@prisma/client"
import { OrderStatusList } from "@/shared/config/defaults"
import { CartItem } from "@/features/cart/model/cart"
import { Order } from "@/shared/models/order.model"

export async function getOrdersPaginated(sp: TObject = {}) {
  try {
    const page = safeParseNumber(sp.page, 1)
    const pageSize = safeParseNumber(sp.pageSize, 10)

    let where: Prisma.OrderWhereInput = {}
    let orderBy = "orderedAt"
    let orderDirection = "desc"

    if (sp.status && OrderStatusList.includes(sp.status)) {
      where.status = sp.status as OrderStatusEnum
    }

    if (sp.orderDirection && !["asc", "desc"].includes(sp.orderDirection as string)) {
      orderDirection = "desc"
    } else {
      orderDirection = sp.orderDirection as string
    }

    if (sp.orderBy && Order.allowedOrderBy.includes(sp.orderBy)) {
      orderBy = sp.orderBy
    } else {
      orderBy = "orderedAt"
    }

    if (sp.unassigned == "yes") {
      where.companyId = null
    }

    if (sp.delivered == "no") {
      where.deliveredAt = null
    }

    const orders = await prisma.order.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { [orderBy]: orderDirection },
      where,
      include: {
        items: { include: { product: true } },
        company: true,
        coupon: true,
        user: true,
        address: true
      }
    })
    const total = await prisma.order.count({ where })
    return createPaginatedResponse(orders, total, page, pageSize)
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated orders")
  }
}

export async function getOrder(orderId: number) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
        company: true,
        coupon: true,
        user: true,
        address: { include: { country: true, city: true } }
      }
    })
    return order
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching order")
  }
}

export async function cancelUserOrderAction(orderId: number) {
  try {
    const user = await getCurrentUser()
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true, status: true }
    })
    if (!order)
      return actionResponse({
        status: 404,
        message: "Order not found"
      })
    if (order.userId !== user?.id) {
      return actionResponse({
        status: 403,
        message: "Unauthorized to cancel this order"
      })
    }
    if (order.status !== OrderStatusEnum.JustOrdered) {
      return actionResponse({
        status: 400,
        message: "Cannot cancel a reviewed order"
      })
    }
    await prisma.order.update({
      where: { id: order.id },
      data: { status: OrderStatusEnum.Canceled }
    })
    return actionResponse({
      status: 200,
      message: "Order cancelled successfully"
    })
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching order")
  }
}

export async function getUserOrder(orderId: number) {
  try {
    const userId = (await getCurrentUser())?.id
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
        company: true,
        coupon: true,
        user: true,
        address: { include: { country: true, city: true } }
      }
    })
    if (!order) return null
    if (order?.userId !== userId) {
      throw new Error("Unauthorized access to order")
    }
    return order
  } catch (error) {
    console.log(error)
    throw new Error(getErrorMessage(error, "Error fetching user order"))
  }
}

export async function getUserOrders(userId: number, sp: TObject = {}) {
  try {
    const page = safeParseNumber(sp.page, 1)
    const pageSize = safeParseNumber(sp.pageSize, 10)

    let where: Prisma.OrderWhereInput = { userId }
    if (sp.status && OrderStatusList.includes(sp.status)) {
      where.status = sp.status as OrderStatusEnum
    }

    const orders = await prisma.order.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where,
      orderBy: { orderedAt: "desc" },
      include: {
        items: { include: { product: true } },
        company: true,
        coupon: true,
        user: true,
        address: { include: { country: true, city: true } }
      }
    })
    const total = await prisma.order.count({ where })
    return createPaginatedResponse(orders, total, page, pageSize)
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching user orders")
  }
}

export async function getCurrentCompanyOrders(sp: TObject = {}) {
  try {
    const company = await getCurrentUser()
    if (!company) throw new Error("User not authenticated")

    const page = safeParseNumber(sp.page, 1)
    const pageSize = safeParseNumber(sp.pageSize, 10)

    let where: Prisma.OrderWhereInput = { companyId: company.id }

    if (sp.status && OrderStatusList.includes(sp.status)) where.status = sp.status as OrderStatusEnum

    const orders = await prisma.order.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      where,
      orderBy: { orderedAt: "desc" },
      include: {
        items: { include: { product: true } },
        company: true,
        coupon: true,
        user: true,
        address: { include: { country: true, city: true } }
      }
    })
    const total = await prisma.order.count({ where })
    return createPaginatedResponse(orders, total, page, pageSize)
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching company orders")
  }
}

export async function getCurrentUserOrders(sp: TObject = {}) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error("User not authenticated")

    if (!sp.page) sp.page = 1
    if (!sp.pageSize) sp.pageSize = 10

    let where: Prisma.OrderWhereInput = { userId: user.id }

    if (sp.status && OrderStatusList.includes(sp.status)) where.status = sp.status as OrderStatusEnum

    const orders = await Order.paginate({
      where,
      pageSize: sp.pageSize,
      page: sp.page,
      orderBy: { orderedAt: "desc" },
      include: {
        items: { include: { product: true } },
        company: true,
        coupon: true,
        user: true,
        address: { include: { country: true, city: true } }
      }
    })
    return orders
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching user orders")
  }
}

export async function changeOrderStatus(orderId: number, status: OrderStatusEnum, statusNumber: number) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true }
    })
    if (!order)
      return actionResponse({
        status: 404,
        message: "Order not found"
      })

    if (!OrderStatusList.includes(status)) {
      return actionResponse({
        status: 400,
        message: "Invalid Order Status"
      })
    }
    if (statusNumber <= 0 && statusNumber > 6) {
      return actionResponse({
        status: 400,
        message: "Invalid Order Status Number"
      })
    }

    if (order.status === OrderStatusEnum.Delivered) {
      return actionResponse({
        status: 400,
        message: "Cannot change status of a delivered order"
      })
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status,
        statusNumber,
        deliveredAt: status === OrderStatusEnum.Delivered ? new Date() : null
      }
    })

    return actionResponse({
      status: 200,
      message: "Order status updated successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: getErrorMessage(error, "Error updating order status")
    })
  }
}

export async function assignOrderShippingCompany(orderId: number, companyId: number) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { id: true, status: true }
    })
    if (!order)
      return actionResponse({
        status: 404,
        message: "Order not found"
      })

    const company = await prisma.user.findUnique({
      where: {
        id: companyId,
        role: UserRoleEnum.deliveryCompany
      }
    })

    if (!company) {
      return actionResponse({
        status: 404,
        message: "Delivery company not found"
      })
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { companyId }
    })

    return actionResponse({
      status: 200,
      message: "Order company updated successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: getErrorMessage(error, "Error updating order status")
    })
  }
}

export async function calculateOrderTotal(items: CartItem[]) {
  try {
    let total = 0
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id, deletedAt: null },
        select: { price: true }
      })
      if (!product) throw new Error(`Product with ID ${item.id} not found`)

      let singleItemPrice = 0

      if (item.size) {
        const size = await prisma.productSize.findUnique({
          where: { id: item.size.id, deletedAt: null },
          select: { price: true }
        })
        if (!size) throw new Error(`Size with ID ${item.size.id} not found for product ID ${item.id}`)
        singleItemPrice = size.price
      } else {
        singleItemPrice = product.price
      }
      total += singleItemPrice * item.quantity
    }
    return total
  } catch (error) {
    console.log(error)
    throw new Error(getErrorMessage(error, "Error calculating order total"))
  }
}

export async function createOnlineOrderAction(addressId: number, items: CartItem[]) {
  try {
    const hasAnOrder = await prisma.order.findFirst({
      where: { deliveredAt: null, status: { not: { in: [OrderStatusEnum.Canceled, OrderStatusEnum.Refused] } } }
    })
    if (hasAnOrder) {
      return actionResponse({
        status: 400,
        message: "You have an ongoing order. Please wait until it is delivered before placing a new one."
      })
    }

    let totalAmount = await calculateOrderTotal(items)

    if (totalAmount <= 0) {
      return actionResponse({
        status: 400,
        message: "Total amount must be greater than zero"
      })
    }

    const user = await getCurrentUser()
    if (!user) {
      return actionResponse({
        status: 401,
        message: "User not authenticated"
      })
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId, userId: user.id },
      include: { country: true, city: true }
    })
    if (!address) {
      return actionResponse({
        status: 404,
        message: "Address not found"
      })
    }

    const deliveryValue = address.country.price + address.city.price
    totalAmount += deliveryValue

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        subTotal: totalAmount - deliveryValue,
        addressId: address.id,
        total: totalAmount,
        paymentMethod: "Card",
        deliveryValue: deliveryValue
      }
    })

    const paymentResponse = generatePaymentUrl({
      orderId: order.id,
      userId: user.id,
      amount: totalAmount,
      currency: "EGP"
    })

    items.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.id, deletedAt: null }
      })

      if (!product)
        return actionResponse({
          status: 404,
          message: `Product with ID ${item.id} not found`
        })

      if (product.quantity < item.quantity) {
        return actionResponse({
          status: 400,
          message: `Insufficient stock for product ID ${item.id}`
        })
      }

      let singleItemPrice = 0
      if (item.size) {
        const size = await prisma.productSize.findUnique({
          where: { id: item.size.id, deletedAt: null }
        })
        if (!size) {
          return actionResponse({
            status: 404,
            message: `Size with ID ${item.size.id} not found for product ID ${item.id}`
          })
        }
        singleItemPrice = size.price
      } else {
        singleItemPrice = product.price
      }

      let colorId = null

      if (item.color) {
        const color = await prisma.productColor.findUnique({
          where: { id: item.color.id, deletedAt: null }
        })
        if (!color) {
          return actionResponse({
            status: 404,
            message: `Color with ID ${item.color.id} not found for product ID ${item.id}`
          })
        }
        colorId = color.id
      }

      const unitPrice = singleItemPrice
      const itemTotal = unitPrice * item.quantity

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          unitPrice: unitPrice,
          totalPrice: itemTotal,
          sizeId: item.size ? item.size.id : null,
          colorId
        }
      })
    })

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentUrl: paymentResponse.paymentUrl }
    })

    return actionResponse({
      status: 201,
      message: "Order placed successfully",
      data: { orderId: order.id, paymentUrl: paymentResponse.paymentUrl }
    })
  } catch (error) {
    console.log(error)
    return actionResponse({
      status: 500,
      message: getErrorMessage(error, "Error creating online order")
    })
  }
}

export async function createCashOrderAction(addressId: number, items: CartItem[]) {
  try {
    const hasAnOrder = await prisma.order.findFirst({
      where: { deliveredAt: null, status: { not: { in: [OrderStatusEnum.Canceled, OrderStatusEnum.Refused] } } }
    })
    if (hasAnOrder) {
      return actionResponse({
        status: 400,
        message: "You have an ongoing order. Please wait until it is delivered before placing a new one."
      })
    }

    let totalAmount = await calculateOrderTotal(items)

    if (totalAmount <= 0) {
      return actionResponse({
        status: 400,
        message: "Total amount must be greater than zero"
      })
    }

    const user = await getCurrentUser()
    if (!user) {
      return actionResponse({
        status: 401,
        message: "User not authenticated"
      })
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId, userId: user.id },
      include: { country: true, city: true }
    })
    if (!address) {
      return actionResponse({
        status: 404,
        message: "Address not found"
      })
    }

    const deliveryValue = address.country.price + address.city.price
    totalAmount += deliveryValue

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        subTotal: totalAmount - deliveryValue,
        addressId: address.id,
        total: totalAmount,
        paymentMethod: "Cash",
        deliveryValue: deliveryValue
      }
    })

    items.map(async (item) => {
      const product = await prisma.product.findUnique({
        where: { id: item.id, deletedAt: null }
      })

      if (!product)
        return actionResponse({
          status: 404,
          message: `Product with ID ${item.id} not found`
        })

      if (product.quantity < item.quantity) {
        return actionResponse({
          status: 400,
          message: `Insufficient stock for product ID ${item.id}`
        })
      }

      if (product.quantity < item.quantity) {
        return actionResponse({
          status: 400,
          message: `Insufficient stock for product ID ${item.id}`
        })
      }

      let singleItemPrice = 0
      if (item.size) {
        const size = await prisma.productSize.findUnique({
          where: { id: item.size.id, deletedAt: null }
        })
        if (!size) {
          return actionResponse({
            status: 404,
            message: `Size with ID ${item.size.id} not found for product ID ${item.id}`
          })
        }
        singleItemPrice = size.price
      } else {
        singleItemPrice = product.price
      }

      let colorId = null

      if (item.color) {
        const color = await prisma.productColor.findUnique({
          where: { id: item.color.id, deletedAt: null }
        })
        if (!color) {
          return actionResponse({
            status: 404,
            message: `Color with ID ${item.color.id} not found for product ID ${item.id}`
          })
        }
        colorId = color.id
      }

      const unitPrice = singleItemPrice
      const itemTotal = unitPrice * item.quantity

      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          unitPrice: unitPrice,
          totalPrice: itemTotal,
          sizeId: item.size ? item.size.id : null,
          colorId: colorId
        }
      })
    })

    return actionResponse({
      status: 201,
      message: "Order placed successfully",
      data: { orderId: order.id }
    })
  } catch (error) {
    console.log(error)
    return actionResponse({
      status: 500,
      message: getErrorMessage(error, "Error creating cash order")
    })
  }
}
