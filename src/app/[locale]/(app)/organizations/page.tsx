import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import RechartsDemo from '@/components/RechartsDemo'
import {useTranslations} from 'next-intl'

export default function OrganizationsPage() {
  const t = useTranslations()
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <CardHeader>
          <CardTitle>{t('organizations')}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* List of user's organizations goes here */}
          <div className="text-muted-foreground">{t('organizations')} list placeholder.</div>
          <div className="mt-4">
            <RechartsDemo />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
