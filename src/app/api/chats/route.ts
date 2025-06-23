import {NextRequest, NextResponse} from 'next/server'
import {API_BASE_URL} from '@/lib/config'

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!accessToken) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/chats`, {
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

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')

  if (!accessToken) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  try {
    const body = await req.json()
    const {chat_title} = body

    if (!chat_title) {
      return NextResponse.json({error: 'Chat title is required'}, {status: 400})
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/chats`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_title,
      }),
    })

    const data = await res.json()
    return NextResponse.json(data, {status: res.status})
  } catch {
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
