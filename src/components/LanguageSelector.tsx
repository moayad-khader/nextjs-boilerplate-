'use client'

import {useState, useRef, useEffect} from 'react'
import {useRouter} from '@/i18n/navigation'
import {usePathname} from '@/i18n/navigation'
import {useLocale} from 'next-intl'
import {LOCALES, getLocaleByCode} from '@/i18n/locales'
import {Button} from '@/components/ui/button'
import {CheckIcon, ChevronDownIcon} from 'lucide-react'
import {cn} from '@/lib/utils'

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocaleConfig = getLocaleByCode(currentLocale) || LOCALES[0]

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, {locale})
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
        <div className="absolute z-10 mt-1 w-full bg-background rounded-md shadow-lg border">
          <div className="py-1">
            {LOCALES.map(locale => (
              <button
                key={locale.code}
                className={cn(
                  'flex items-center w-full px-4 py-2 text-sm hover:bg-accent',
                  locale.code === currentLocale ? 'bg-accent/50' : '',
                )}
                onClick={() => handleLanguageChange(locale.code)}
              >
                <span className="mr-2">{locale.flag}</span>
                <span className="flex-1 text-left">{locale.nativeName}</span>
                {locale.code === currentLocale && <CheckIcon className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
