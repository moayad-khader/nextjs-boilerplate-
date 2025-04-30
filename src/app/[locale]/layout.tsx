import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import ClientProviders from '@/providers/ClientProviders'
import '@/app/globals.css'
import {setRequestLocale} from 'next-intl/server'
import {routing} from '@/i18n/routing'
import DirectionController from '@/components/DirectionController'

export default async function LocaleLayout({
  children,
  params,
}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DirectionController />
      <ClientProviders>{children}</ClientProviders>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}))
}
