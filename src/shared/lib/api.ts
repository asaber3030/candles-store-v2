import { NextResponse } from "next/server"

export function response({ message = "Action", status = 200, data = null, errors = null }: { errors?: any; message?: string; status?: number; data?: any }) {
  return NextResponse.json(
    {
      message,
      status,
      data,
      errors
    },
    { status }
  )
}

export function actionResponse({ message = "Action", status = 200, data = null, errors = null }: { errors?: any; message?: string; status?: number; data?: any }) {
  return {
    message,
    status,
    data,
    errors
  }
}
