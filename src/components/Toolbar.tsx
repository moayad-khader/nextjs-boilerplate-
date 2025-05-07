'use client'
import {useTranslations, useLocale} from 'next-intl'
import {Link, usePathname} from '@/i18n/navigation'
import {LanguageSelector} from './LanguageSelector'
import {LayoutDashboard} from 'lucide-react'
import {useSession} from 'next-auth/react'
import LogoutButton from './LogoutButton'

const links = [
  {href: '/organizations', label: 'organizations'},
  {href: '/organization-settings', label: 'organizationSettings'},
  {href: '/user-settings', label: 'userSettings'},
  {href: '/login', label: 'login'},
]

export default function Toolbar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations()
  const {data: session, status} = useSession()
  const isLoggedIn = status === 'authenticated'

  return (
    <nav className="w-full bg-background/95 border-b px-4 py-2 flex gap-4 items-center shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href="/"
        locale={locale}
        className="flex items-center gap-2 font-bold text-lg mr-4 text-primary hover:text-primary/80 focus-visible:underline focus-visible:outline-none transition-colors"
        aria-label="Go to homepage"
      >
        <LayoutDashboard className="w-6 h-6 text-primary" aria-hidden="true" />
        <span>TalkToYourData</span>
      </Link>
      <div className="flex gap-2">
        {links
          .filter(link => !(link.href === '/login' && isLoggedIn))
          .map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                locale={locale}
                className={
                  isActive
                    ? 'text-primary font-semibold underline underline-offset-4'
                    : 'text-muted-foreground hover:text-primary focus-visible:underline focus-visible:outline-none transition-colors'
                }
                aria-current={isActive ? 'page' : undefined}
              >
                {t(link.label)}
              </Link>
            )
          })}
      </div>
      <div className="ml-auto flex items-center gap-2 w-60 justify-end">
        <LanguageSelector />
        {status === 'loading' ? null : isLoggedIn ? (
          <>
            {session?.user?.name && <span className="text-sm text-muted-foreground mr-2">{session.user.name}</span>}
            <LogoutButton />
          </>
        ) : null}
      </div>
    </nav>
  )
}
