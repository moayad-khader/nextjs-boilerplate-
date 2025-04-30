import {defineRouting} from 'next-intl/routing'
import {localeList as locales} from './locales'

export const defaultLocale = 'ar'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
})
