import {apiFetch} from '@/lib/api'
import {APICallbacks} from '@/types/api'
import {Chat, chatSchema, GetChatThreadsResponse} from '@/types/chat'
import {Session} from 'next-auth'

export async function createChat(chat_tile: string, session: Session, callbacks: APICallbacks<Chat>): Promise<Chat> {
  try {
    callbacks?.onStart?.()
    const res = await apiFetch(
      '/api/chats',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({chat_title: chat_tile}),
      },
      session,
    )
    if (!res.ok) {
      throw new Error('Failed to create chat')
    }
    const data = await res.json()
    const chat = chatSchema.parse(data)
    callbacks?.onSuccess?.(chat)
    return chat
  } catch (error) {
    callbacks?.onError?.(error as Error)
    throw error
  } finally {
    callbacks?.onFinish?.()
  }
}

export async function getChats(session: Session, callbacks: APICallbacks<Chat[]>): Promise<Chat[]> {
  try {
    callbacks?.onStart?.()
    const res = await apiFetch('/api/chats', {method: 'GET'}, session)
    if (!res.ok) {
      throw new Error('Failed to fetch chats')
    }
    const data = await res.json()
    const chats = data
      .map((chat: any) => {
        const result = chatSchema.safeParse(chat)
        if (!result.success) {
          console.error('Failed to parse chat:', result.error)
          return null
        }
        return result.data
      })
      .filter(Boolean) as Chat[]
    callbacks?.onSuccess?.(chats)
    return chats
  } catch (error) {
    callbacks?.onError?.(error as Error)
    throw error
  } finally {
    callbacks?.onFinish?.()
  }
}

export async function getChatThreads(
  chatId: string,
  session: Session,
  callbacks: APICallbacks<GetChatThreadsResponse>,
): Promise<GetChatThreadsResponse> {
  try {
    callbacks?.onStart?.()
    const res = await apiFetch(`/api/chats/${chatId}/threads`, {method: 'GET'}, session)
    if (!res.ok) {
      throw new Error('Failed to fetch chat threads')
    }
    const data = await res.json()
    callbacks?.onSuccess?.(data)
    return data
  } catch (error) {
    callbacks?.onError?.(error as Error)
    throw error
  } finally {
    callbacks?.onFinish?.()
  }
}
