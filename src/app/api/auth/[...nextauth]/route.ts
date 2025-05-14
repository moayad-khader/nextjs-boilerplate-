import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {JWT} from 'next-auth/jwt'
import {API_BASE_URL} from '@/lib/config'

type CookieStringType = string | undefined | null

function getRefreshTokenFromCookie(cookiesString: CookieStringType): string | null {
  if (!cookiesString) {
    return null
  }
  const cookies = cookiesString.split(';').map((c: string) => c.trim())
  const refreshCookie = cookies.find((c: string) => c.startsWith('refresh_token='))
  if (!refreshCookie) {
    return null
  }
  return refreshCookie.split('=')[1]
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok || !data.access_token) {
      throw new Error('Failed to refresh access token')
    }

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    }
  } catch {
    // If refresh fails, return the original token with an error flag
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'username or email'},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
              username: credentials.username,
              password: credentials.password,
            }),
            credentials: 'include',
          })

          if (!res.ok) {
            return null
          }

          const data = await res.json()
          const isOnServer = typeof window === 'undefined'
          const refreshToken = isOnServer
            ? getRefreshTokenFromCookie(res.headers.get('set-cookie'))
            : getRefreshTokenFromCookie(document.cookie)

          if (data?.access_token) {
            return {
              id: credentials.username,
              accessToken: data.access_token,
              refreshToken,
              accessTokenExpires: Date.now() + data.expires_in * 1000,
            }
          }

          return null
        } catch {
          // FIXME: Add error handling
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        }
      }

      if (typeof token.accessTokenExpires === 'number' && Date.now() < token.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(token)
    },

    async session({session, token}) {
      session.accessToken = token.accessToken

      if (token.error) {
        session.error = token.error
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
})

export {handler as GET, handler as POST}
