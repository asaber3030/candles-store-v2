"use server"

import EmailService from "@/shared/api/email"

import emailConfig from "@/shared/config/services/email.config"
import authConfig from "@/shared/config/services/auth.config"
import appConfig from "@/shared/config/defaults/app"
import bcrypt from "bcryptjs"
import prisma from "@/shared/api/prisma"
import jwt from "jsonwebtoken"
import z from "zod"

import { actionResponse } from "@/shared/lib/api"
import { cookies } from "next/headers"

import { AuthLoginSchema, AuthRegisterSchema, AuthUpdateInformationSchema, AuthUpdatePasswordSchema } from "../model/auth.schema"
import { TLoginType, TUpdateInformationPayload, TUpdatePasswordPayload } from "../model/auth"
import { revalidatePath } from "next/cache"
import { randomBetween } from "@/shared/lib/numbers"

export async function getCurrentUser() {
  try {
    const store = await cookies()
    const token = store.get(authConfig.authCookieName!)

    if (!token) return null

    const decoded = jwt.verify(token.value, authConfig.authSecret!) as { id: number }
    if (!decoded?.id) return null

    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user) return null

    const { password, ...realUser } = user!

    return realUser
  } catch (error) {
    return null
  }
}

export async function loginAction(data: z.infer<typeof AuthLoginSchema>, type: TLoginType) {
  try {
    const entity = await prisma.user.findUnique({
      where: { email: data.email, role: type }
    })
    if (!entity) throw new Error("User not found")

    const isPasswordValid = await bcrypt.compare(data.password, entity.password)
    if (!isPasswordValid) throw new Error("Invalid password")

    const { password, ...realUser } = entity

    const token = jwt.sign(realUser, authConfig.authSecret!, {
      expiresIn: `${authConfig.expirationDays}d`
    })
    const store = await cookies()
    store.set({
      name: authConfig.authCookieName!,
      value: token,
      httpOnly: true,
      maxAge: authConfig.expirationDays! * 24 * 60 * 60
    })
    revalidatePath("/")

    return actionResponse({
      message: "Login successful",
      status: 200,
      data: {
        user: realUser,
        token
      }
    })
  } catch (error) {
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function registerAction(data: z.infer<typeof AuthRegisterSchema>) {
  try {
    const existingEmail = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true }
    })
    if (existingEmail) throw new Error("Email already in use")

    const existingPhone = await prisma.user.findUnique({
      where: { phoneNumber: data.phoneNumber },
      select: { id: true }
    })
    if (existingPhone) throw new Error("Phone Number already in use")

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        cityId: data.cityId,
        countryId: data.countryId,
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
    console.log(error)
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function updateUserInformationAction(data: TUpdateInformationPayload) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")

    const parsed = AuthUpdateInformationSchema.parse(data)

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: parsed.email,
        id: { not: user.id }
      },
      select: { id: true }
    })
    if (existingEmail)
      return actionResponse({
        message: "Email already in use",
        status: 400
      })

    const existingPhone = await prisma.user.findFirst({
      where: {
        phoneNumber: parsed.phoneNumber,
        id: { not: user.id }
      },
      select: { id: true }
    })
    if (existingPhone)
      return actionResponse({
        message: "Phone Number already in use",
        status: 400
      })

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: parsed.name,
        email: parsed.email,
        phoneNumber: parsed.phoneNumber,
        countryId: parsed.countryId,
        cityId: parsed.cityId
      }
    })

    const { password, ...realUser } = updatedUser

    return actionResponse({
      message: "User information updated successfully",
      status: 200,
      data: realUser
    })
  } catch (error) {
    console.log(error)
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function updateUserPasswordAction(data: TUpdatePasswordPayload) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error("Unauthorized")

    const parsed = AuthUpdatePasswordSchema.parse(data)

    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }
    })
    if (!existingUser) throw new Error("User not found")

    const isPasswordValid = await bcrypt.compare(parsed.currentPassword, existingUser.password)
    if (!isPasswordValid) throw new Error("Current password is incorrect")

    const hashedNewPassword = await bcrypt.hash(parsed.newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    })

    return actionResponse({
      message: "Password updated successfully",
      status: 200
    })
  } catch (error) {
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function logoutAction() {
  try {
    const store = await cookies()
    store.delete(authConfig.authCookieName!)
    revalidatePath("/")
    return actionResponse({
      message: "Logout successful",
      status: 200
    })
  } catch (error) {
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error("User not found")

    const code = randomBetween(100000, 999999).toString()
    const token = jwt.sign({ code }, emailConfig.secret, { expiresIn: "10m" })

    const existingToken = await prisma.passwordResetToken.findUnique({
      where: { email }
    })

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    if (existingToken && existingToken?.expiresAt) {
      if (existingToken.expiresAt > new Date()) {
        return actionResponse({
          message: "A reset token has already been sent. Please check your email.",
          status: 400
        })
      } else {
        await prisma.passwordResetToken.delete({ where: { email } })
      }
    }

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt
      }
    })

    await EmailService.sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `
        Click the link below to reset your password:
        ${appConfig.appUrl}/reset-password?token=${token}&email=${email}
      `
    })

    return actionResponse({
      message: "Password reset email sent",
      status: 200
    })
  } catch (error) {
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function checkPasswordResetToken(email: string, token: string) {
  try {
    const record = await prisma.passwordResetToken.findUnique({
      where: { email }
    })
    if (!record) throw new Error("Invalid or expired token")

    if (record.token !== token) throw new Error("Invalid token")
    if (!record.expiresAt) throw new Error("Invalid token")
    if (record.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { email } })
      throw new Error("Token has expired")
    }

    return actionResponse({
      message: "Token is valid",
      status: 200
    })
  } catch (error) {
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}

export async function resetPasswordAction(email: string, token: string, newPassword: string) {
  try {
    const record = await prisma.passwordResetToken.findUnique({
      where: { email }
    })
    if (!record) throw new Error("Invalid or expired token")

    if (record.token !== token) throw new Error("Invalid token")
    if (!record.expiresAt) throw new Error("Invalid token")

    if (record.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({ where: { email } })
      throw new Error("Token has expired")
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword }
    })

    await prisma.passwordResetToken.delete({ where: { email } })

    return actionResponse({
      message: "Password has been reset successfully",
      status: 200
    })
  } catch (error) {
    return actionResponse({
      message: error instanceof Error ? error.message : "Unknown error",
      status: 400
    })
  }
}
