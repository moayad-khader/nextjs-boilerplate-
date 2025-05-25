'use client'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import RechartsDemo from '@/components/RechartsDemo'
import {useTranslations} from 'use-intl'

export default function LiveboardsPage() {
  const t = useTranslations()
  return (
    <div className="bg-gradient-light flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>{t('liveboards')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">{t('liveboards')} form placeholder.</div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
