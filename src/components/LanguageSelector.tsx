'use client'

import {useState, useRef, useEffect} from 'react'
import {useLocale} from 'use-intl'
import {useRouter, usePathname} from 'next/navigation'
import {LOCALES_CONFIG, getLocaleConfigByCode, DEFAULT_LOCALE, AVAILABLE_LOCALES} from '@/i18n'
import {Button} from '@/components/ui/button'
import {CheckIcon, ChevronDownIcon} from 'lucide-react'
import {cn} from '@/lib/utils'

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocaleConfig = getLocaleConfigByCode(currentLocale) || getLocaleConfigByCode(DEFAULT_LOCALE)!

  const handleLanguageChange = (newLocale: string) => {
    const pathSegments = pathname.split('/').filter(Boolean)
    let newPath = '/' + newLocale

    if (pathSegments.length > 0) {
      const currentLocaleIndex = AVAILABLE_LOCALES.includes(pathSegments[0] as any) ? 1 : 0
      const routeSegments = pathSegments.slice(currentLocaleIndex)

      if (routeSegments.length > 0) {
        newPath += '/' + routeSegments.join('/')
      }
    }

    router.push(newPath)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" size="sm" className="flex items-center gap-2 w-full" onClick={() => setIsOpen(!isOpen)}>
        <span className="mr-1">{currentLocaleConfig.flag}</span>
        <span className="flex-1 text-left">{currentLocaleConfig.nativeName}</span>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-[100000] mt-1 w-full bg-background rounded-md shadow-lg border">
          <div className="py-1">
            {LOCALES_CONFIG.map(localeConfig => (
              <button
                key={localeConfig.code}
                className={cn(
                  'flex items-center w-full px-4 py-2 text-sm hover:bg-accent',
                  localeConfig.code === currentLocale ? 'bg-accent/50' : '',
                )}
                onClick={() => handleLanguageChange(localeConfig.code)}
              >
                <span className="mr-2">{localeConfig.flag}</span>
                <span className="flex-1 text-left">{localeConfig.nativeName}</span>
                {localeConfig.code === currentLocale && <CheckIcon className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
