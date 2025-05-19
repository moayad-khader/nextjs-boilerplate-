import {notFound} from 'next/navigation'
import '@/app/globals.css'
import {AVAILABLE_LOCALES} from '@/i18n'
import IntlClientProvider from '@/components/IntlClientProvider'

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (_error) {
    notFound()
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  const {locale} = await params

  if (!AVAILABLE_LOCALES.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages(locale)

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <IntlClientProvider locale={locale} messages={messages}>
          {children}
        </IntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return AVAILABLE_LOCALES.map(locale => ({locale}))
}
