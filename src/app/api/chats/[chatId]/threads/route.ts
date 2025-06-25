import {NextRequest, NextResponse} from 'next/server'
import {API_BASE_URL} from '@/lib/config'

export async function GET(req: NextRequest, {params}: {params: Promise<{chatId: string}>}) {
  const accessToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!accessToken) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {chatId} = await params

  if (!chatId) {
    return NextResponse.json({error: 'Chat ID is required'}, {status: 400})
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/chats/${chatId}/threads`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    return NextResponse.json(data, {status: res.status})
  } catch {
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
