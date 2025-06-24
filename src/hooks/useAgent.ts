import {useSession} from 'next-auth/react'
import {useLocalStorage} from './useLocalStorage'
import {startAgentSession, talkToAgent} from '@/apis/agent'
import {AgentTalkResponse} from '@/types/agent'

/**
 * Custom hook for managing agent sessions and communication
 * @returns { talk } - Function to send messages to the agent
 */
export function useAgent() {
  const {data: session} = useSession()
  const [agentSessionId, setAgentSessionId, removeAgentSessionId] = useLocalStorage<string | null>(
    'agentSessionId',
    null,
  )

  /**
   * Send a message to the agent
   * @param message - The message to send to the agent
   * @returns Promise<AgentTalkResponse> - The agent's response
   */
  const talk = async (message: string, chatId: string): Promise<AgentTalkResponse> => {
    if (!session) {
      throw new Error('No active session')
    }

    if (!message.trim()) {
      throw new Error('Message cannot be empty')
    }

    let sessionId = agentSessionId

    // Create a new session if one doesn't exist
    if (!sessionId) {
      const newSessionId = await startAgentSession(session)
      setAgentSessionId(newSessionId)
      sessionId = newSessionId
    }
    console.log('Current session ID:', sessionId)

    // Send the message to the agent
    try {
      const result = await talkToAgent(
        {
          session_id: sessionId,
          message: message.trim(),
          chat_id: chatId, // Optional chat ID, can be used for context
        },
        session,
      )
      console.log('Agent response:', result)
      return result
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (error) {
      const newSessionId = await startAgentSession(session)
      setAgentSessionId(newSessionId)
      sessionId = newSessionId
      const result = await talkToAgent(
        {
          session_id: sessionId,
          message: message.trim(),
          chat_id: chatId, // Optional chat ID, can be used for context
        },
        session,
      )
      console.log('Agent response:', result)
      return result
    }
  }

  /**
   * Clear the current agent session
   */
  const clearSession = () => {
    removeAgentSessionId()
  }

  return {
    talk,
    clearSession,
  }
}
