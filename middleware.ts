import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { routing } from './src/i18n/routing';

// Public paths that don't require authentication
const PUBLIC_PATHS = [
  // Login and error pages in any locale
  /^\/(ar|en)\/login(\/)?$/,
  /^\/(ar|en)\/error(\/)?$/,
  // Root path
  /^\/$/,
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, req.url));
  }
  
  // Allow access to public paths without authentication
  if (PUBLIC_PATHS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }
  
  // Check for authentication token
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If not authenticated, redirect to login
  if (!token) {
    // Extract locale from path or use default
    const localeMatch = pathname.match(/^\/([a-zA-Z-]+)\//);
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    
    // Redirect to the locale-specific login page
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }
  
  // User is authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_static|favicon.ico).*)',
  ],
}; 