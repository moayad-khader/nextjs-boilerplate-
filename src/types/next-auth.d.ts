import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    error?: 'RefreshAccessTokenError'
  }

  interface User {
    id: string
    accessToken: string
    refreshToken?: string | null
    accessTokenExpires: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenExpires: number
    refreshToken?: string | null
    error?: 'RefreshAccessTokenError'
  }
}


