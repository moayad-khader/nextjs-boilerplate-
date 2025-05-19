import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './src/i18n'; 

const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') || 
    pathname.includes('.') 
  ) {
    return NextResponse.next();
  }

 
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || '';
  
  const isLocaleInPath = AVAILABLE_LOCALES.includes(firstSegment as any);
  
  if (pathname === '/' || !isLocaleInPath) {
    const newPath = pathname === '/' 
      ? `/${DEFAULT_LOCALE}` 
      : `/${DEFAULT_LOCALE}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
      
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  const currentLocale = isLocaleInPath ? firstSegment : DEFAULT_LOCALE;

  if (pathname.endsWith(`/login`)) {
    return NextResponse.next(); 
  }

  try {
    const token = await getToken({ req: request, secret: nextAuthSecret });

    if (!token) {
      const loginRedirectUrl = new URL(`/${currentLocale}/login`, request.url);
      
      request.nextUrl.searchParams.forEach((value, key) => {
        loginRedirectUrl.searchParams.set(key, value);
      });
      
      const returnUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
      loginRedirectUrl.searchParams.set('returnUrl', returnUrl);
      
      return NextResponse.redirect(loginRedirectUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (pathname.endsWith(`/login`)) {
      return NextResponse.next();
    }
    
    const loginRedirectUrl = new URL(`/${currentLocale}/login`, request.url);
    loginRedirectUrl.searchParams.set('error', 'auth_error');
    return NextResponse.redirect(loginRedirectUrl);
  }
}

export const config = {
  matcher: [
    '/((?!_next|static|api|.*\\.).*)', // Matches paths not starting with _next, static, api, or containing a dot
    '/', // Matches the root path explicitly if not caught by the above
  ],
};