"use server"

import prisma from "@/shared/api/prisma"

import { Prisma } from "@prisma/client"
import { City } from "@/shared/models/city.model"
import { CreateCitySchema } from "../model/city.schema"
import { TCreateCityPayload } from "../model/city"
import { ZodError } from "zod"

import { actionResponse } from "@/shared/lib/api"

export async function getCitiesPaginated(sp: TObject = {}) {
  try {
    if (!sp.page) sp.page = 1
    if (!sp.pageSize) sp.pageSize = 10

    let where: Prisma.CityWhereInput = {}

    if (sp.search) {
      where.name = { contains: String(sp.search) }
    }

    const cities = await City.paginate({
      page: sp.page,
      pageSize: sp.pageSize,
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      where
    })

    return cities
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated Cities")
  }
}

export async function getAllCities(sp: TObject = {}) {
  try {
    let where: Prisma.CityWhereInput = {}

    if (sp.search) {
      where.name = { contains: String(sp.search) }
    }

    const cities = await prisma.city.findMany({
      where: { ...where, isActive: true },
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" }
    })

    return cities
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching all Cities")
  }
}

export async function getCity(cityId: number) {
  try {
    const city = await prisma.city.findUnique({
      where: { id: cityId }
    })
    return city
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching city")
  }
}

/* Admin Actions */
export async function createCityAction(data: TCreateCityPayload) {
  try {
    const parsed = CreateCitySchema.parse(data)
    const newCity = await prisma.city.create({
      data: { ...parsed, isActive: parsed.isActive ? true : false }
    })
    return actionResponse({
      status: 201,
      message: "City created successfully",
      data: newCity
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data"
      })
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error creating city"
    })
  }
}

export async function updateCityAction(cityId: number, data: TCreateCityPayload) {
  try {
    const parsed = CreateCitySchema.parse(data)
    const updatedCity = await prisma.city.update({
      where: { id: cityId },
      data: { ...parsed, isActive: parsed.isActive ? true : false }
    })
    return actionResponse({
      status: 200,
      message: "City updated successfully",
      data: updatedCity
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return actionResponse({
        status: 400,
        message: "Invalid input data"
      })
    }
    return actionResponse({
      status: 500,
      message: error instanceof Error ? error.message : "Error updating city"
    })
  }
}
