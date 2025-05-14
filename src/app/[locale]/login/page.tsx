'use client'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {signIn} from 'next-auth/react'
import {useTranslations, useLocale} from 'next-intl'
import {EyeIcon, EyeOffIcon} from 'lucide-react'

export default function LoginPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [username, setUsername] = useState('')
  const [isHidden, setIsHidden] = useState(true)
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
      callbackUrl: `/${locale}`,
    })
    if (res && res.error) {
      setError(t('signInError') || 'Invalid credentials')
    } else if (res && res.ok) {
      window.location.href = res.url || `/${locale}`
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient">
      <div className="flex min-h-[80vh] items-center justify-center">
        <Card className="w-[580px] max-w-full min-h-[550px] p-6 md:p-8 shadow-lg border-none rounded-3xl bg-white/60 backdrop-blur-lg flex flex-col justify-center">
          <CardHeader>
            <div className="flex flex-col items-center gap-3 mb-6">
              {/* Logo can be added here */}
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">{t('signInTitle')}</CardTitle>
              <span className="text-base text-gray-500 text-center">{t('signInSubtitle')}</span>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">
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
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20 focus:outline-none transition"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                  {t('passwordLabel')}
                </label>
                <div className="flex w-full items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20 focus:outline-none transition">
                  <input
                    id="password"
                    name="password"
                    type={isHidden ? 'password' : 'text'}
                    autoComplete="current-password"
                    required
                    value={password}
                    className="flex-1"
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <div className="flex cursor-pointer" onClick={() => setIsHidden(prev => !prev)}>
                    {isHidden ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <a href="#" className="text-sm font-medium hover:underline" style={{color: 'var(--primary)'}}>
                  {t('forgotPassword') || 'Forget Password?'}
                </a>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button
                className="w-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/30"
                type="submit"
                disabled={loading}
              >
                {loading ? t('signingIn') : t('signInButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
