'use client'

import {signOut} from 'next-auth/react'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {API_BASE_URL} from '@/lib/config'

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export default function LogoutButton({variant = 'outline', size = 'sm'}: LogoutButtonProps) {
  const t = useTranslations()

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
      signOut({callbackUrl: '/'})
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogout}>
      {t('logout')}
    </Button>
  )
}
