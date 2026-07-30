import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get('gearup_user_role')?.value;

  // Protected paths mapping
  if (pathname.startsWith('/dashboard/customer')) {
    if (!userRole) {
      return NextResponse.redirect(new URL('/auth/login?redirect=' + pathname, request.url));
    }
    if (userRole !== 'CUSTOMER' && userRole !== 'ADMIN') {
      // Redirect to appropriate dashboard
      if (userRole === 'PROVIDER') return NextResponse.redirect(new URL('/dashboard/provider', request.url));
      if (userRole === 'ADMIN') return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  if (pathname.startsWith('/dashboard/provider')) {
    if (!userRole) {
      return NextResponse.redirect(new URL('/auth/login?redirect=' + pathname, request.url));
    }
    if (userRole !== 'PROVIDER' && userRole !== 'ADMIN') {
      if (userRole === 'CUSTOMER') return NextResponse.redirect(new URL('/dashboard/customer', request.url));
    }
  }

  if (pathname.startsWith('/dashboard/admin')) {
    if (!userRole) {
      return NextResponse.redirect(new URL('/auth/login?redirect=' + pathname, request.url));
    }
    if (userRole !== 'ADMIN') {
      if (userRole === 'CUSTOMER') return NextResponse.redirect(new URL('/dashboard/customer', request.url));
      if (userRole === 'PROVIDER') return NextResponse.redirect(new URL('/dashboard/provider', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
