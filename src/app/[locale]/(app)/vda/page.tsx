'use client'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import RechartsDemo from '@/components/RechartsDemo'
import {useTranslations} from 'next-intl'

export default function VdaPage() {
  const t = useTranslations()

  return (
    <div className="flex h-screen">
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
      <main className="flex-1 flex flex-col">
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
          />
          <Button type="submit">{t('send')}</Button>
        </form>
      </main>
    </div>
  )
}
