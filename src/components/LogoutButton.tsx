'use client'

import {signOut} from 'next-auth/react'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {API_BASE_URL} from '@/lib/config'
import {usePathname} from '@/i18n/navigation'

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export default function LogoutButton({variant = 'outline', size = 'sm'}: LogoutButtonProps) {
  const t = useTranslations()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch {
      // FIXME: Add error handling
    } finally {
      // Extract locale from current path, fallback to 'en'
      const match = pathname.match(/^\/([a-zA-Z-]+)\//)
      const locale = match ? match[1] : 'en'
      signOut({callbackUrl: `/${locale}/login`})
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout}>
      {t('logout')}
    </Button>
  )
}
