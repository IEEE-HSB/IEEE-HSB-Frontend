import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value
  const path = req.nextUrl.pathname

  // حماية الداشبورد
  if (path.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // منع دخول login لو already logged in
  if ((path === '/login' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
