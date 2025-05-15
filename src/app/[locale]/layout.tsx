// src/app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import '@/app/globals.css'
import {setRequestLocale} from 'next-intl/server'
import {routing} from '@/i18n/routing'
import DirectionController from '@/components/DirectionController'
import messages from '@/i18n/messages'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  // Check if we have messages for this locale
  if (!messages[locale]) {
    console.error(`No messages found for locale: ${locale}`)
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <DirectionController />
      {children}
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}))
}
