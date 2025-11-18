import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import authConfig from "./shared/config/services/auth.config"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Get JWT token
  const token = req.cookies.get(authConfig.authCookieName)?.value

  // -------------- PUBLIC ROUTES --------------
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/delivery-companies/login")) {
    return NextResponse.next()
  }

  // -------------- REQUIRE AUTHENTICATION --------------
  if (!token) {
    return redirectToLogin(pathname, req)
  }

  // -------------- VERIFY JWT --------------
  try {
    const secret = new TextEncoder().encode(authConfig.authSecret)
    const { payload } = await jwtVerify(token, secret)
    const user = payload

    if (!user?.id || !user?.role) {
      return redirectToLogin(pathname, req)
    }

    // -------------- ROLE-BASED PROTECTION --------------

    // USER → /profile/**
    if (pathname.startsWith("/profile")) {
      if (user.role !== "user") {
        return redirectToHomeByRole(user.role as any, req)
      }
      return NextResponse.next()
    }

    // ADMIN → /admin/**
    if (pathname.startsWith("/admin")) {
      if (user.role !== "admin") {
        return redirectToHomeByRole(user.role as any, req)
      }
      return NextResponse.next()
    }

    // DELIVERY COMPANY → /delivery-companies/**
    if (pathname.startsWith("/delivery-companies")) {
      if (user.role !== "deliveryCompany") {
        return redirectToHomeByRole(user.role as any, req)
      }
      return NextResponse.next()
    }

    return NextResponse.next()
  } catch (err) {
    console.error("JWT Error:", err)
    return redirectToLogin(pathname, req)
  }
}

// ---------------------------------------------------
// HELPERS
// ---------------------------------------------------

function redirectToLogin(pathname: string, req: NextRequest) {
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }
  if (pathname.startsWith("/delivery-companies")) {
    return NextResponse.redirect(new URL("/delivery-companies/login", req.url))
  }
  return NextResponse.redirect(new URL("/login", req.url))
}

function redirectToHomeByRole(role: "admin" | "user" | "deliveryCompany", req: NextRequest) {
  switch (role) {
    case "admin":
      return NextResponse.redirect(new URL("/admin", req.url))
    case "deliveryCompany":
      return NextResponse.redirect(new URL("/delivery-companies", req.url))
    default:
      return NextResponse.redirect(new URL("/profile", req.url))
  }
}

// ---------------------------------------------------
// ROUTE MATCHER
// ---------------------------------------------------

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*", "/delivery-companies/:path*"]
}
