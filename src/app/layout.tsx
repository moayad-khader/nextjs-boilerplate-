import {ReactNode} from 'react'
import {headers} from 'next/headers'
import '@/app/globals.css'
import {Geist, Geist_Mono} from 'next/font/google'
import {cn} from '@/lib/utils'
import ClientProviders from '@/providers/ClientProviders'
import {defaultLocale} from '@/i18n/routing'
import {RTL_LOCALES} from '@/i18n/locales'

const geistSans = Geist({variable: '--font-geist-sans', subsets: ['latin']})
const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']})

export const metadata = {
  title: 'TalkToYourData',
  description: 'Talk to your data in any language.',
}

export default async function RootLayout({children}: {children: ReactNode}) {
  const h = await headers()

  // Get locale directly from next-intl middleware
  const locale = h.get('x-next-intl-locale') || defaultLocale

  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir}>
      <body className={cn('min-h-screen bg-background font-sans antialiased', geistSans.variable, geistMono.variable)}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
