import {useState, useEffect, useCallback, useMemo} from 'react'
import {useSession} from 'next-auth/react'
import {useSearchParams, useRouter} from 'next/navigation'
import {createChat, getChatThreads} from '@/apis/chats'
import {useAgent} from './useAgent'
import {Message} from '@/types/message'
import {ChatThread} from '@/types/chat'

/**
 * Transform chat threads to messages
 * @param threads - Array of chat threads
 * @returns Array of messages
 */
function transformThreadsToMessages(threads: ChatThread[]): Message[] {
  const messages: Message[] = []
  console.log('Transforming threads to messages:', threads)
  threads.forEach(thread => {
    // Add user message
    messages.push({
      id: `user-${thread.chat_thread_id}`,
      type: 'user',
      text: thread.chat_thread_question.message,
      timestamp: new Date(thread.created_at),
    })

    // Add agent response (already a message)
    messages.push({
      id: `agent-${thread.chat_thread_id}`,
      type: 'agent',
      text: thread.chat_thread_response.response,
      timestamp: new Date(thread.updated_at),
      graph: thread.chat_thread_response.config_json?.config, // Optional graph data
      report: {content: thread.chat_thread_response.generated_sql}, // Optional report data
    })
  })

  // Sort by timestamp to ensure proper order
  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

/**
 * Custom hook for managing a single chat conversation
 * @returns {object} - Object containing chat data, messages, and functions
 */
export function useChat() {
  const {data: session} = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const chatId = useMemo(() => searchParams.get('chatId'), [searchParams])

  const {talk} = useAgent()

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [sendingMessage, setSendingMessage] = useState(false)

  /**
   * Create a new chat and update URL
   */
  const createNewChat = useCallback(
    async (title: string): Promise<string> => {
      if (!session) {
        throw new Error('No active session')
      }

      const newChat = await createChat(title, session, {
        onStart: () => setLoading(true),
        onError: err => setError(err),
        onFinish: () => setLoading(false),
      })

      // Update URL with new chat ID
      const params = new URLSearchParams(searchParams.toString())
      params.set('chatId', newChat.chat_id)
      router.replace(`?${params.toString()}`)

      return newChat.chat_id
    },
    [session, searchParams, router],
  )

  /**
   * Fetch messages for the current chat
   */
  const fetchMessages = useCallback(
    async (currentChatId: string) => {
      if (!session || !currentChatId) {
        return
      }

      setLoading(true)
      setError(null)
      const threads = await getChatThreads(currentChatId, session, {
        onStart: () => setLoading(true),
        onError: err => setError(err),
        onSuccess: () => {
          setError(null)
        },
        onFinish: () => setLoading(false),
      })
      console.log('Fetched threads:', threads)
      const transformedMessages = transformThreadsToMessages(threads)
      console.log('Transformed messages:', transformedMessages)
      setMessages(transformedMessages)
    },
    [session],
  )

  /**
   * Send a message to the agent
   */
  const sendMessage = useCallback(
    async (message: string): Promise<void> => {
      if (!session) {
        throw new Error('No active session')
      }

      if (!message.trim()) {
        throw new Error('Message cannot be empty')
      }

      setSendingMessage(true)
      setError(null)

      try {
        // Add user message immediately to UI
        const userMessage: Message = {
          id: `temp-user-${Date.now()}`,
          type: 'user',
          text: message.trim(),
          timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage])

        let currentChatId = chatId

        // Create a new chat if no chatId exists
        if (!currentChatId) {
          // Use the first few words of the message as chat title
          const title = message.trim().split(' ').slice(0, 5).join(' ')
          currentChatId = await createNewChat(title)
        }

        // Send message to agent
        const agentResponse = await talk(message.trim(), currentChatId)

        // Create agent message from response
        const agentMessage: Message = {
          id: `temp-agent-${Date.now()}`,
          type: 'agent',
          text: agentResponse.response,
          timestamp: new Date(),
          graph: agentResponse.config_json.config,
        }

        setMessages(prev => [...prev, agentMessage])

        // Refetch messages to get the latest state from server
        if (currentChatId) {
          await fetchMessages(currentChatId)
        }
      } catch (err) {
        setError(err as Error)
        // Remove the temporary user message on error
        setMessages(prev => prev.filter(msg => !msg.id.startsWith('temp-user-')))
      } finally {
        setSendingMessage(false)
      }
    },
    [session, chatId, talk, createNewChat, fetchMessages],
  )

  /**
   * Clear the current chat
   */
  const clearChat = useCallback(() => {
    setMessages([])
    setError(null)

    // Remove chatId from URL
    const params = new URLSearchParams(searchParams.toString())
    params.delete('chatId')
    router.replace(`?${params.toString()}`)
  }, [searchParams, router])

  // Fetch messages when chatId changes
  useEffect(() => {
    if (chatId && session) {
      fetchMessages(chatId)
    }
  }, [chatId, session, fetchMessages])

  return {
    chatId,
    messages,
    loading,
    error,
    sendingMessage,
    sendMessage,
    clearChat,
    refetch: () => chatId && fetchMessages(chatId),
  }
}
