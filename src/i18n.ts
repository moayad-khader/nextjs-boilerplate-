import type {LiteralUnion} from 'type-fest'
import type {NamespaceKeys, NestedKeyOf, useTranslations} from 'use-intl'

import type arMessages from '@/messages/ar.json'

export const AVAILABLE_LOCALES = ['ar', 'en'] as const
export const DEFAULT_LOCALE = 'ar' as const

export interface LocaleConfig {
  code: Locale
  nativeName: string
  englishName: string
  direction: 'ltr' | 'rtl'
  flag?: string
}

export const LOCALES_CONFIG: LocaleConfig[] = [
  {
    code: 'ar',
    nativeName: 'العربية',
    englishName: 'Arabic',
    direction: 'rtl',
    flag: '🇸🇦',
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
]

export function getLocaleConfigByCode(code: string): LocaleConfig | undefined {
  return LOCALES_CONFIG.find(locale => locale.code === code)
}

export function isRTL(localeCode: string): boolean {
  const config = getLocaleConfigByCode(localeCode)
  return config ? config.direction === 'rtl' : false
}

export type Messages = typeof arMessages
export type Locale = (typeof AVAILABLE_LOCALES)[number]

export type MessageNamespace = NamespaceKeys<Messages, NestedKeyOf<Messages>>

export type Translator<NestedKey extends MessageNamespace = never> = ReturnType<typeof useTranslations<NestedKey>>

export type TranslateKeys<NestedKey extends MessageNamespace = never> = Parameters<Translator<NestedKey>>[0]

export const tKey = <NestedKey extends MessageNamespace = never>(key: TranslateKeys<NestedKey>) => key

export function isLocale(locale: LiteralUnion<Locale, string>): locale is Locale {
  return AVAILABLE_LOCALES.includes(locale as Locale)
}
