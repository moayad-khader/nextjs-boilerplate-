import {getRequestConfig} from 'next-intl/server'
import {hasLocale} from 'next-intl'
import {routing} from './routing'

export default getRequestConfig(async ({requestLocale}) => {
  const locale = requestLocale && hasLocale(routing.locales, requestLocale) ? requestLocale : routing.defaultLocale

  const messages = (await import(`../messages/${locale}.json`)).default

  return {locale, messages}
})
