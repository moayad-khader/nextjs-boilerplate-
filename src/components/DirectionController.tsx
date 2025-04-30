'use client'

import {useEffect} from 'react'
import {useLocale} from 'next-intl'
import {RTL_LOCALES} from '@/i18n/locales'

/**
 * Client component that sets the HTML dir attribute based on the current locale
 * This ensures RTL/LTR switching works properly during client-side navigation
 */
export default function DirectionController() {
  const locale = useLocale()

  useEffect(() => {
    // Set the HTML dir attribute based on the current locale
    const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [locale])

  return null
}
