'use client'
import {useTranslations, useLocale} from 'next-intl'
import {Link, usePathname} from '@/i18n/navigation'
import {LanguageSelector} from './LanguageSelector'

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

  return (
    <nav className="w-full bg-background border-b px-4 py-2 flex gap-4 items-center shadow-sm">
      <span className="font-bold text-lg mr-4">TalkToYourData</span>
      {links.map(link => {
        const isActive = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            locale={locale}
            className={isActive ? 'text-primary font-semibold underline' : 'text-blue-600 hover:underline'}
            aria-current={isActive ? 'page' : undefined}
          >
            {t(link.label)}
          </Link>
        )
      })}
      <div className="ml-auto w-40">
        <LanguageSelector />
      </div>
    </nav>
  )
}
