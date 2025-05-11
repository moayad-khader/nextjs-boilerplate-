'use client'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {signIn} from 'next-auth/react'
import {useTranslations} from 'next-intl'

export default function LoginPage() {
  const t = useTranslations()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: '/',
    })
    if (res && res.error) {
      setError(t('signInError') || 'Invalid credentials')
    } else if (res && res.ok) {
      window.location.href = res.url || '/'
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardHeader>
            <CardTitle>{t('signInTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  {t('usernameLabel')}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="input input-bordered w-full"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  {t('passwordLabel')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                  disabled={loading}
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? t('signingIn') : t('signInButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
