'use client'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import RechartsDemo from '@/components/RechartsDemo'
import {useTranslations, useLocale} from 'next-intl'
import {useSession, signIn} from 'next-auth/react'
import {Link} from '@/i18n/navigation'
import {useEffect} from 'react'
import {Loader2} from 'lucide-react'

export default function VdaPage() {
  const t = useTranslations()
  const {data: session, status} = useSession()
  const locale = useLocale()
  const isLoggedIn = status === 'authenticated'

  // Handle refresh token errors
  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // Access token was expired and refresh token failed
      signIn() // Force sign in to fix the session
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen relative">
      <aside className="w-64 bg-muted p-4 border-r">
        <Card>
          <CardHeader>
            <CardTitle>{t('vda')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">{t('chatHistory')}</div>
          </CardContent>
        </Card>
      </aside>
      {/* Main chat area */}
      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* User/Agent Messages placeholder */}
          <div className="space-y-2">
            <div className={`flex justify-end`}>
              <div className="bg-primary text-primary-foreground rounded-lg p-3 w-fit max-w-xs">{t('userMessage')}</div>
            </div>
            <div className={`flex justify-start`}>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-3 w-fit max-w-xs">
                {t('agentMessage')}
              </div>
            </div>
          </div>
          <div className="mt-4 text-muted-foreground">{t('narrative')}</div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </div>
        <form className="p-4 border-t flex gap-2 sticky bottom-0 bg-background">
          <input
            type="text"
            className="flex-1 rounded border px-3 py-2 focus:outline-none focus:ring"
            placeholder={t('typeMessage')}
            disabled={!isLoggedIn}
            aria-disabled={!isLoggedIn}
            tabIndex={isLoggedIn ? 0 : -1}
          />
          <Button type="submit" disabled={!isLoggedIn} aria-disabled={!isLoggedIn} tabIndex={isLoggedIn ? 0 : -1}>
            {t('send')}
          </Button>
        </form>
        {!isLoggedIn && (
          <div
            className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-20"
            style={{pointerEvents: 'auto'}}
          >
            <Card className="w-full max-w-md p-6 text-center shadow-xl">
              <CardHeader>
                <CardTitle>{t('loginRequiredTitle') || 'Login Required'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 text-muted-foreground">
                  {t('loginRequiredMessage') || 'You must be logged in to use the VDA.'}
                </div>
                <Link href="/login" locale={locale}>
                  <Button>{t('login')}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
