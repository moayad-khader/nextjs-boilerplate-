import {Session} from 'next-auth'
import {API_BASE_URL} from '@/lib/config'

export async function apiFetch(endpoint: string, options: RequestInit = {}, session?: Session | null) {
  const headers = new Headers(options.headers || {})
  if ((session as any)?.accessToken) {
    headers.set('Authorization', `Bearer ${(session as any).accessToken}`)
  }
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // to send cookies for refresh
  })
}
