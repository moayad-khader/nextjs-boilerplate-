import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Skip static files, API, Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect any non-locale-prefixed path to default locale
  const firstSegment = pathname.split('/')[1];
  if (!routing.locales.includes(firstSegment as any)) {
    const newPath = pathname === '/' ? `/${routing.defaultLocale}` : `/${routing.defaultLocale}${pathname}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Only locale-prefixed paths reach here
  const handleI18nRouting = createIntlMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    localePrefix: routing.localePrefix,
  });

  const i18nResponse = handleI18nRouting(request);

  let effectivePathname = pathname;
  if (i18nResponse.headers.get('x-middleware-rewrite')) {
    effectivePathname = new URL(i18nResponse.headers.get('x-middleware-rewrite')!).pathname;
  } else if (i18nResponse.status === 307 || i18nResponse.status === 308) {
    const locationHeader = i18nResponse.headers.get('location');
    if (locationHeader) {
      effectivePathname = new URL(locationHeader, origin).pathname;
    }
  }

  // Auth check for all locale-prefixed, non-static, non-API routes
  const token = await getToken({ req: request, secret: nextAuthSecret });
  if (!token) {
    let currentLocale = routing.defaultLocale;
    const detectedLocaleFromPath = effectivePathname.split('/')[1];
    if (routing.locales.includes(detectedLocaleFromPath as any)) {
      currentLocale = detectedLocaleFromPath;
    }
    const loginRedirectUrl = new URL(`/${currentLocale}/login`, request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
      loginRedirectUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(loginRedirectUrl);
  }

  return i18nResponse;
}

export const config = {
  matcher: [
    '/',
    '/:path*',
  ],
};