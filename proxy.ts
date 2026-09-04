// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Execute strictly for /admin routes
  if (pathname.startsWith('/admin')) {
    const authed = await isAuthenticated(request);
    const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

    let response: NextResponse;

    if (isLoginPage) {
      if (authed) {
        response = NextResponse.redirect(new URL('/admin', request.url));
      } else {
        response = NextResponse.next();
      }
    } else if (!authed) {
      response = NextResponse.redirect(new URL('/admin/login', request.url));
    } else {
      response = NextResponse.next();
    }

    // 1. BLOCK SEARCH ENGINES: Instruct all search engines never to index, follow, or store admin pages
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
    
    // 2. HARDENED HTTP SECURITY HEADERS
    response.headers.set('X-Frame-Options', 'DENY'); // Protects against Clickjacking framing
    response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevents MIME-sniffing
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin'); // Limits referrer leaks

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};