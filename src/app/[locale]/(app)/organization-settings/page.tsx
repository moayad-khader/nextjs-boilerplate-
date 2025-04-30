import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import RechartsDemo from '@/components/RechartsDemo'
import {useTranslations} from 'next-intl'

export default function OrganizationSettingsPage() {
  const t = useTranslations()
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>{t('organizationSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Organization settings form goes here */}
          <div className="text-muted-foreground">{t('organizationSettings')} form placeholder.</div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
