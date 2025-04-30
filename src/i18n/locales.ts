export interface LocaleConfig {
  code: string
  nativeName: string
  englishName: string
  direction: 'ltr' | 'rtl'
  flag?: string
}

export const LOCALES: LocaleConfig[] = [
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

export const localeList = LOCALES.map(locale => locale.code)
export const defaultLocale = 'ar'
export const RTL_LOCALES = LOCALES.filter(locale => locale.direction === 'rtl').map(locale => locale.code)

export function getLocaleByCode(code: string): LocaleConfig | undefined {
  return LOCALES.find(locale => locale.code === code)
}

export function isRTL(localeCode: string): boolean {
  return RTL_LOCALES.includes(localeCode)
}
