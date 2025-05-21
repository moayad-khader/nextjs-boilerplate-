'use client'
import {useTranslations, useLocale} from 'use-intl'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useSession} from 'next-auth/react'
import {useEffect} from 'react'

const links = [
  {href: '/home', label: 'home' as const},
  {href: '/agent', label: 'agent' as const},
  {href: '/liveboards', label: 'liveboards' as const},
  {href: '/settings', label: 'settings' as const},
]

export default function Toolbar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations()
  const {status} = useSession()
  const isLoggedIn = status === 'authenticated'

  useEffect(() => {
    console.log('Current pathname:', pathname)
    console.log('Locale:', locale)
  }, [pathname, locale])

  const isLinkActive = (linkPath: string) => {
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '')

    if (pathWithoutLocale === linkPath) {
      return true
    }
    if (pathname === `/${locale}${linkPath}`) {
      return true
    }

    if (linkPath === '/home' && (pathWithoutLocale === '' || pathWithoutLocale === '/')) {
      return true
    }

    const basePathWithoutLeadingSlash = linkPath.replace(/^\//, '')
    if (basePathWithoutLeadingSlash && pathWithoutLocale.startsWith(`/${basePathWithoutLeadingSlash}/`)) {
      return true
    }

    return false
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full px-4 py-5 flex gap-4 items-center shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{
      background: 'linear-gradient(60deg, #f2fbfa 0%, #ffffff 50%, #f2fbfa 100%)'
      }}
    >
      {/* ... logo ... */}
      <div className="relative flex gap-6">
        {links
          .filter(link => !(link.href === '/login' && isLoggedIn))
          .map(link => {
            const isActive = isLinkActive(link.href)
            // Create localized href with the current locale
            const hrefWithLocale = `/${locale}${link.href}`

            return (
              <Link
                key={link.href}
                href={hrefWithLocale}
                className={
                  'px-4 py-2 rounded-md font-semibold transition-all duration-200 ' +
                  (isActive
                    ? 'text-primary bg-white shadow-md'
                    : 'text-muted-foreground hover:text-primary hover:bg-white/30')
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {t(link.label)}
              </Link>
            )
          })}
      </div>
    </nav>
  )
}
