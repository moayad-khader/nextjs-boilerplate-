import {ReactNode} from 'react'
import {Geist, Geist_Mono} from 'next/font/google'
import {cn} from '@/lib/utils'
import ClientProviders from '@/providers/ClientProviders'

export const geistSans = Geist({variable: '--font-geist-sans', subsets: ['latin']})
export const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']})

export const metadata = {
  title: 'TalkToYourData',
  description: 'Talk to your data in any language.',
}

export default function RootLayout({children}: {children: ReactNode}) {
  return <ClientProviders>{children}</ClientProviders>
}
