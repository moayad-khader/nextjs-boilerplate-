import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {JWT} from 'next-auth/jwt'
import {API_BASE_URL} from '@/lib/config'

function parseRefreshTokenFromSetCookieHeader(setCookieValue: string | null | undefined): string | null {
  if (!setCookieValue) {
    return null
  }
  const cookies = setCookieValue.split(/,\\s*/)
  for (const cookieStr of cookies) {
    const parts = cookieStr.split(';')
    const tokenPart = parts.find(part => part.trim().startsWith('refresh_token='))
    if (tokenPart) {
      const token = tokenPart.split('=')[1]
      if (token) {
        return token.trim()
      }
    }
  }
  return null
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
      refreshToken: data.refresh_token ?? token.refreshToken,
    }
  } catch {
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
          const setCookieHeader = res.headers.get('set-cookie')
          const refreshToken = parseRefreshTokenFromSetCookieHeader(setCookieHeader)

          if (data?.access_token) {
            return {
              id: credentials.username,
              accessToken: data.access_token,
              refreshToken: refreshToken,
              accessTokenExpires: Date.now() + data.expires_in * 1000,
            }
          }
          return null
        } catch {
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
    async jwt({token, user, account}) {
      if (account && user) {
        return {
          accessToken: user.accessToken,
          accessTokenExpires: (user as any).accessTokenExpires,
          refreshToken: (user as any).refreshToken,
          user: user,
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token
      }

      return refreshAccessToken(token)
    },

    async session({session, token}) {
      session.accessToken = token.accessToken as string
      if (token.error) {
        session.error = token.error as 'RefreshAccessTokenError'
      }
      // If you want to expose the whole user object to the session, uncomment next line
      // session.user = token.user as any;
      return session
    },
  },
  pages: {
    signIn: '/ar/login',
    error: '/ar/error',
  },
})

export {handler as GET, handler as POST}
