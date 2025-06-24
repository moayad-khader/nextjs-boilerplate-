import {apiFetch} from '@/lib/api'
import {agentSessionSchema, AgentTalkResponse, agentTalkResponseSchema} from '@/types/agent'
import {APICallbacks} from '@/types/api'
import {Session} from 'next-auth'

export async function startAgentSession(session: Session, callbacks?: APICallbacks<string>): Promise<string> {
  try {
    callbacks?.onStart?.()
    const res = await apiFetch(
      '/api/agent/session',
      {
        method: 'GET',
      },
      session,
    )
    if (!res.ok) {
      throw new Error('Failed to start session')
    }
    const data = agentSessionSchema.safeParse(await res.json())
    if (!data.success) {
      throw new Error('Invalid session data')
    }
    const session_id = data.data.session_id
    callbacks?.onSuccess?.(session_id)
    return session_id
  } catch (error) {
    callbacks?.onError?.(error as Error)
    throw new Error('Failed to start agent session')
  } finally {
    callbacks?.onFinish?.()
    // Any cleanup if necessary
  }
}

export async function talkToAgent(
  data: {
    session_id: string
    message: string
    chat_id: string // Optional chat ID for context
  },
  session: Session,
  callbacks?: APICallbacks<AgentTalkResponse>,
): Promise<AgentTalkResponse> {
  try {
    callbacks?.onStart?.()
    console.log('Sending message to agent:', data)
    const res = await apiFetch(
      '/api/agent/talk',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      session,
    )
    console.log('Response status:', res)
    if (!res.ok) {
      throw new Error('Failed to send message')
    }
    const responseData = await res.json()
    console.log('Raw response data:', responseData)
    const parsedData = agentTalkResponseSchema.safeParse(responseData)
    console.log('Parsed response data:', parsedData)
    if (!parsedData.success) {
      throw new Error('Invalid response data')
    }
    console.log('Agent response:', parsedData.data)
    callbacks?.onSuccess?.(parsedData.data)
    return parsedData.data
  } catch (error) {
    callbacks?.onError?.(error as Error)
    throw new Error('Failed to talk to agent')
  } finally {
    callbacks?.onFinish?.()
    // Any cleanup if necessary
  }
}

export async function getSessionState(
  session: Session,
  callbacks?: APICallbacks<{state: string}>,
): Promise<{state: string}> {
  try {
    callbacks?.onStart?.()
    const res = await apiFetch(
      '/api/agent/session/state',
      {
        method: 'GET',
      },
      session,
    )
    if (!res.ok) {
      throw new Error('Failed to get session state')
    }
    const data = await res.json()
    callbacks?.onSuccess?.(data)
    return data
  } catch (error) {
    callbacks?.onError?.(error as Error)
    throw new Error('Failed to get session state')
  } finally {
    callbacks?.onFinish?.()
  }
}
