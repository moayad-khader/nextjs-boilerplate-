import {useState, useEffect, useCallback} from 'react'
import {useSession} from 'next-auth/react'
import {getChats} from '@/apis/chats'
import {Chat} from '@/types/chat'

/**
 * Custom hook for managing user chats
 * @returns {object} - Object containing chats data and loading state
 */
export function useChats() {
  const {data: session} = useSession()
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchChats = useCallback(async () => {
    if (!session) {
      setChats([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      await getChats(session, {
        onStart: () => setLoading(true),
        onSuccess: data => {
          setChats(data)
          setError(null)
        },
        onError: err => {
          setError(err)
          setChats([])
        },
        onFinish: () => setLoading(false),
      })
    } catch (err) {
      setError(err as Error)
      setChats([])
    }
  }, [session])

  useEffect(() => {
    if (session) {
      fetchChats()
    } else {
      setChats([])
    }
  }, [session, fetchChats])

  const refetch = () => {
    fetchChats()
  }

  return {
    chats,
    loading,
    error,
    refetch,
  }
}
