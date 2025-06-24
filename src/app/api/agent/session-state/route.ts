import {NextRequest, NextResponse} from 'next/server'
import {API_BASE_URL} from '@/lib/config'

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!accessToken) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const res = await fetch(`${API_BASE_URL}/api/v1/session/state`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  return NextResponse.json(data, {status: res.status})
}
