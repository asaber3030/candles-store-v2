"use server"

import prisma from "@/shared/api/prisma"

import { Prisma, UserRoleEnum } from "@prisma/client"
import { User } from "@/shared/models/user.model"

import { actionResponse } from "@/shared/lib/api"
import { UserRolesList } from "@/shared/config/defaults"
import bcrypt from "bcryptjs"
import { getErrorMessage } from "@/shared/lib/functions"
import { TCreateAddressPayload, TCreateAdminPayload } from "../model/user"
import { CreateAddressSchema } from "../model/user.schema"
import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { revalidatePath } from "next/cache"

export async function getUsersPaginated(sp: TObject = {}) {
  try {
    if (!sp.page) sp.page = 1
    if (!sp.pageSize) sp.pageSize = 10

    let where: Prisma.UserWhereInput = {}

    if (sp.search) {
      where.OR = [{ name: { contains: String(sp.search) } }, { email: { contains: String(sp.search) } }]
    }

    if (sp.trashed && sp.trashed === "only") {
      where.deletedAt = { not: null }
    }

    if (sp.role && UserRolesList.includes(sp.role)) {
      where.role = sp.role
    }

    const users = await User.paginate({
      page: sp.page,
      pageSize: sp.pageSize,
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      where
    })

    return users
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated users")
  }
}

export async function getAllUsers(sp: TObject = {}) {
  try {
    if (!sp.page) sp.page = 1
    if (!sp.pageSize) sp.pageSize = 10

    let where: Prisma.UserWhereInput = {}

    if (sp.search) {
      where.OR = [{ name: { contains: String(sp.search) } }, { email: { contains: String(sp.search) } }]
    }

    if (sp.trashed && sp.trashed === "only") {
      where.deletedAt = { not: null }
    }

    if (sp.role && UserRolesList.includes(sp.role)) {
      where.role = sp.role
    }

    const users = await User.findMany({
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      where
    })

    return users
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated users")
  }
}

export async function getUser(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        city: true,
        country: true
      }
    })
    return user
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching User")
  }
}

export async function getUserAddresses(userId: number) {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { city: true, country: true }
    })
    return addresses
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching User addresses")
  }
}

export async function getCurrentUserAddresses() {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")
    const addresses = await prisma.address.findMany({
      where: { userId: user.id, deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { city: true, country: true }
    })
    return addresses
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching User addresses")
  }
}

export async function getCurrentUserDefaultAddress() {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")
    const addresses = await prisma.address.findFirst({
      where: { userId: user.id, isDefault: true, deletedAt: null },
      include: { city: true, country: true }
    })
    return addresses
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching User default address")
  }
}

export async function countCurrentUserAddresses() {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")
    const length = await prisma.address.count({
      where: { userId: user.id }
    })
    return length
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching count user addresses")
  }
}

export async function createUserAddressAction(data: TCreateAddressPayload) {
  try {
    const parsed = CreateAddressSchema.parse(data)
    const user = await getCurrentUser()

    if (!user) {
      return actionResponse({
        message: "Unauthorized",
        status: 401
      })
    }

    const newAddress = await prisma.address.create({
      data: { ...parsed, userId: user.id }
    })

    if (parsed.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true, id: { not: newAddress.id } },
        data: { isDefault: false }
      })
    }

    revalidatePath("/checkout")

    return actionResponse({
      message: "Address created successfully",
      status: 201,
      data: newAddress
    })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Unknown error"),
      status: 400
    })
  }
}

export async function updateUserAddressAction(addressId: number, data: TCreateAddressPayload) {
  try {
    const parsed = CreateAddressSchema.parse(data)
    const user = await getCurrentUser()

    if (!user) {
      return actionResponse({
        message: "Unauthorized",
        status: 401
      })
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== user.id) {
      return actionResponse({
        message: "Address not found",
        status: 404
      })
    }

    if (parsed.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false }
      })
    }

    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: { ...parsed }
    })
    return actionResponse({
      message: "Address updated successfully",
      status: 200,
      data: updatedAddress
    })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Unknown error"),
      status: 400
    })
  }
}

export async function deleteUserAddressAction(addressId: number) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return actionResponse({
        message: "Unauthorized",
        status: 401
      })
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== user.id) {
      return actionResponse({
        message: "Address not found",
        status: 404
      })
    }

    await prisma.address.update({
      where: { id: addressId },
      data: { deletedAt: new Date() }
    })
    return actionResponse({
      message: "Address deleted successfully",
      status: 200
    })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Unknown error"),
      status: 400
    })
  }
}

export async function restoreUserAddressAction(addressId: number) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return actionResponse({
        message: "Unauthorized",
        status: 401
      })
    }

    const address = await prisma.address.findUnique({
      where: { id: addressId }
    })

    if (!address || address.userId !== user.id) {
      return actionResponse({
        message: "Address not found",
        status: 404
      })
    }

    const restoredAddress = await prisma.address.update({
      where: { id: addressId },
      data: { deletedAt: null }
    })
    return actionResponse({
      message: "Address restored successfully",
      status: 200,
      data: restoredAddress
    })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Unknown error"),
      status: 400
    })
  }
}

/* Admin Actions */

export async function createUserAction(data: TCreateAdminPayload) {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true }
    })
    if (existingEmail)
      return actionResponse({
        message: "Email already in use",
        status: 400
      })

    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber: data.phoneNumber },
      select: { id: true }
    })
    if (existingPhone)
      return actionResponse({
        message: "Phone Number already in use",
        status: 400
      })

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        cityId: data.cityId,
        countryId: data.countryId,
        role: data.role,
        password: hashedPassword
      }
    })
    const { password, ...realUser } = newUser
    return actionResponse({
      message: "Registration successful",
      status: 201,
      data: realUser
    })
  } catch (error) {
    return actionResponse({
      message: getErrorMessage(error, "Unknown error"),
      status: 400
    })
  }
}

export async function deleteUserAction(userId: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() }
    })
    return actionResponse({
      status: 200,
      message: "User deleted successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error deleting User"
    })
  }
}

export async function restoreUserAction(userId: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { deletedAt: null }
    })
    return actionResponse({
      status: 200,
      message: "User restored successfully"
    })
  } catch (error) {
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error restoring User"
    })
  }
}
