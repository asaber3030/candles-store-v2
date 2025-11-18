import { cookies } from "next/headers"

import axios, { AxiosError, AxiosRequestConfig } from "axios"
import appConfig from "../../app.config"
import authConfig from "../config/services/auth.config"

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

const request = axios.create({
  baseURL: appConfig.apiUrl
})

request.interceptors.request.use(async (config) => {
  const cookieStore = await cookies()
  const token = cookieStore.get(authConfig.cookieName)?.value || ""

  config.headers.set("Authorization", `Bearer ${token}`)

  return config
})

const handleApiResponse = (error: unknown): ApiResponse<any> => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    const errorData = axiosError.response?.data as ApiResponse<any>
    return {
      message: errorData?.message || "Something went wrong",
      status: (axiosError.response?.status as number) || 500,
      data: errorData || null
    }
  }
  return { message: "Network error or unexpected error", status: 500, data: null }
}

export const api = async <T>(method: HttpMethod, url: string, body?: any, headers?: TObject): Promise<ApiResponse<T>> => {
  try {
    let response
    const config: AxiosRequestConfig = { headers }

    switch (method) {
      case "GET":
        response = await request.get<ApiResponse<T>>(url, config)
        break
      case "POST":
        response = await request.post<ApiResponse<T>>(url, body, config)
        break
      case "PUT":
        response = await request.put<ApiResponse<T>>(url, body, config)
        break
      case "PATCH":
        response = await request.patch<ApiResponse<T>>(url, body, config)
        break
      case "DELETE":
        response = await request.delete<ApiResponse<T>>(url, config)
        break
      default:
        throw new Error(`Unsupported HTTP method: ${method}`)
    }
    return response.data
  } catch (error) {
    throw handleApiResponse(error)
  }
}

export const getRequest = <T>(url: string, headers?: TObject): Promise<ApiResponse<T>> => api<T>("GET", url, undefined, headers)

export const postRequest = <T>(url: string, body: any, headers?: TObject): Promise<ApiResponse<T>> => api<T>("POST", url, body, headers)

export const putRequest = <T>(url: string, body: any, headers?: TObject): Promise<ApiResponse<T>> => api<T>("PUT", url, body, headers)

export const patchRequest = <T>(url: string, body: any, headers?: TObject): Promise<ApiResponse<T>> => api<T>("PATCH", url, body, headers)

export const deleteRequest = <T>(url: string, headers?: TObject): Promise<ApiResponse<T>> => api<T>("DELETE", url, undefined, headers)
