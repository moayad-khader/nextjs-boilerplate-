'use client'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import RechartsDemo from '@/components/RechartsDemo'
import {useTranslations} from 'use-intl'
import {LanguageSelector} from '@/components/LanguageSelector'
import {useSession} from 'next-auth/react'
import LogoutButton from '@/components/LogoutButton'

export default function SettingsPage() {
  const t = useTranslations()
  const {data: session, status} = useSession()
  const isLoggedIn = status === 'authenticated'
  return (
    <div className="p-4 space-y-6" 
    style={{
      background: 'linear-gradient(60deg, #ddf3f1 0%, #ffffff 50%, #ddf3f1 100%)'
      }}
    >
      <h1 className="text-xl font-semibold">{t('settings')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t('userSettings') || 'Language Settings'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <LanguageSelector />
            <LogoutButton />
          </div>
          <div className="ml-auto flex items-center gap-2 w-60 justify-end">
            {isLoggedIn ? (
              <>
                {session?.user?.name && <span className="text-sm text-muted-foreground mr-2">{session.user.name}</span>}
                <LogoutButton />
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>{t('settings')} form placeholder.</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">{t('settings')} form placeholder.</div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
