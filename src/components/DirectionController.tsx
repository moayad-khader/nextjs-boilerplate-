'use client'

import {useEffect} from 'react'
import {useLocale} from 'use-intl'
import {isRTL} from '@/i18n'

/**
 * Client component that sets the HTML dir attribute based on the current locale
 * This ensures RTL/LTR switching works properly during client-side navigation
 * The root layout already sets initial dir and lang, this handles updates
 */
export default function DirectionController() {
  const locale = useLocale()

  useEffect(() => {
    // Set the HTML dir attribute based on the current locale
    const dir = isRTL(locale) ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
  }, [locale])

  return null
}
