import {Session} from 'next-auth'

export async function apiFetch(endpoint: string, options: RequestInit = {}, session?: Session | null) {
  const headers = new Headers(options.headers || {})
  if (session && session.accessToken) {
    headers.set('Authorization', `Bearer ${session.accessToken}`)
  }
  return fetch(`${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  })
}
