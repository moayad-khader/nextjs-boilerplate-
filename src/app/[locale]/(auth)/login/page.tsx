'use client'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {signIn} from 'next-auth/react'
import {useTranslations} from 'next-intl'

export default function LoginPage() {
  const t = useTranslations()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-background">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle>{t('signInTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => signIn()}>
            {t('signInWithProvider')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
