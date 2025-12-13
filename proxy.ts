import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register', '/'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const encryptedToken = (await cookies()).get('authToken')?.value;
  const token = encryptedToken ? decrypt(encryptedToken) : null;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
