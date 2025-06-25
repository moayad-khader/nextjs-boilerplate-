import {NextRequest, NextResponse} from 'next/server'
import {API_BASE_URL} from '@/lib/config'

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!accessToken) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const body = await req.text()

  const res = await fetch(`${API_BASE_URL}/api/v1/session/talk`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: body,
  })

  const data = await res.text()
  return new NextResponse(data, {
    status: res.status,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
