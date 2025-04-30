import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/', // This will match the root and allow redirect to defaultLocale
    '/((?!api|_next|_static|favicon.ico).*)'
  ]
}; 