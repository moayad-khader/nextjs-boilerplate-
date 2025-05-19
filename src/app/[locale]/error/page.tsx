'use client'
import {useTranslations, useLocale} from 'use-intl'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'

export default function ErrorPage() {
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const loginHref = `/${locale}/login`

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-[580px] max-w-full min-h-[300px] p-6 md:p-8 lg:p-10 shadow-lg border-none bg-white/60 backdrop-blur-md flex flex-col justify-center">
          <CardHeader>
            <div className="flex flex-col items-center gap-3 mb-6">
              <CardTitle className="text-2xl font-bold text-red-600 text-center">
                {t('errorTitle') || 'Authentication Error'}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-gray-700">
              {error || t('authError') || 'There was a problem with your authentication.'}
            </p>
            <Link href={loginHref}>
              <Button className="w-full hover:opacity-90">{t('backToLogin') || 'Back to Login'}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
