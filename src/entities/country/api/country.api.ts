"use server"

import prisma from "@/shared/api/prisma"

import { TCreateCountryPayload } from "../model/country"
import { CreateCountrySchema } from "../model/country.schema"
import { ZodError } from "zod"
import { Prisma } from "@prisma/client"

import { createPaginatedResponse } from "@/shared/lib/functions"
import { safeParseNumber } from "@/shared/lib/numbers"
import { actionResponse } from "@/shared/lib/api"

export async function getCountriesPaginated(sp: TObject = {}) {
  try {
    const page = safeParseNumber(sp.page, 1)
    const pageSize = safeParseNumber(sp.pageSize, 10)

    let where: Prisma.CountryWhereInput = {}

    if (sp.search) where.name = { contains: String(sp.search) }

    const countries = await prisma.country.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sp.orderBy || "id"]: sp.orderDirection || "asc" },
      where
    })

    const total = await prisma.country.count({ where })
    return createPaginatedResponse(countries, total, page, pageSize)
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching paginated countries")
  }
}

export async function getAllCountries(sp: TObject = {}) {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" }
    })

    return countries
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching all countries")
  }
}

export async function getCountry(countryId: number) {
  try {
    const country = await prisma.country.findUnique({
      where: { id: countryId },
      include: { cities: true }
    })
    return country
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching Country")
  }
}

/* Admin Actions */
export async function createCountryAction(data: TCreateCountryPayload) {
  try {
    const parsed = CreateCountrySchema.parse(data)
    const newCountry = await prisma.country.create({
      data: parsed
    })
    return actionResponse({
      status: 201,
      message: "Country created successfully",
      data: newCountry
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
      message: error instanceof Error ? error.message : "Error creating Country"
    })
  }
}

export async function updateCountryAction(country: number, data: TCreateCountryPayload) {
  try {
    const parsed = CreateCountrySchema.parse(data)
    const updatedCountry = await prisma.country.update({
      where: { id: country },
      data: parsed
    })
    return actionResponse({
      status: 200,
      message: "Country updated successfully",
      data: updatedCountry
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
      message: error instanceof Error ? error.message : "Error updating Country"
    })
  }
}
