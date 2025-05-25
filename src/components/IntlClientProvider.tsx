'use client'

import {IntlProvider} from 'use-intl'
import DirectionController from '@/components/DirectionController'

export default function IntlClientProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: Record<string, string>
}) {
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      timeZone="UTC"
      onError={_error => {
        return undefined
      }}
    >
      <DirectionController />
      {children}
    </IntlProvider>
  )
}
