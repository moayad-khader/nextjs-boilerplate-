'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'
import { useSession, signIn } from 'next-auth/react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Loader2, Menu } from 'lucide-react'
import ChatSidebar from './components/ChatSidebar'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import { cn } from '@/lib/utils'
import QuickSuggestions from './components/QuickSuggestions'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { agentSessionSchema } from '@/types/agent'

const startAgentSession = async (accessToken: string) => {
  const res = await fetch('/api/agent/session', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to start session')
  }
  const data = agentSessionSchema.safeParse(await res.json())
  if (!data.success) {
    throw new Error('Invalid session data')
  }
  const session_id = data.data.session_id
  return session_id
}

const talkToAgent = async (sessionId: string, text: string, accessToken: string) => {
  const res = await fetch('/api/agent/talk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      session_id: sessionId,
      message: text,
    }),
  })

  console.log('Request body:', {
    session_id: sessionId,
    message: text,
  })
  if (!res.ok) {
    console.error('Error response:', await res.text())
    throw new Error('Failed to send message')
  }
  return await res.text()
}

export type MessageGrpah = {
  graphType: number
  graphData: {
    name: string
    messages: number
    responses: number
  }[]
}

export type MessageReport = {
  content: string
}

export type Message = {
  id: string
  type: 'user' | 'agent'
  text: string
  timestamp: Date
  graph?: MessageGrpah
  report?: MessageReport
}



export default function AgentPage() {
  const t = useTranslations()
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  const { data: session, status } = useSession()
  const [language, setLanguage] = useState<'AR' | 'EN'>('EN')
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const isSmallScreen = useIsSmallScreen()
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmallScreen)
  const [agentSessionId, setAgentSessionId] = useState<string | null>(null)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn()
    }
  }, [session])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) {
      return
    }
    setShowSuggestions(false)

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    let sessionId = agentSessionId
    if (!sessionId) {
      const newSessionId = await startAgentSession(session!.accessToken as string)
      setAgentSessionId(newSessionId)
      sessionId = newSessionId
    }

    const result = await talkToAgent(sessionId, text.trim(), session!.accessToken as string)
    console.log('Sending message:', text.trim())
    console.log('Received response:', result)

  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  useEffect(() => {
    setIsSidebarOpen(!isSmallScreen)
  }, [isSmallScreen])

  return (
    <div className="flex h-full bg-gradient-light relative">
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label={t('openSidebar')}
        >
          <Menu size={24} className="text-gray-600" />
        </button>
      )}

      {isSidebarOpen && (
        <>
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ease-in-out"
            aria-label={t('closeSidebar')}
          ></div>
          <div className="fixed top-0 left-0 h-full z-50 md:hidden">
            <ChatSidebar onClose={toggleSidebar} isOpen={isSidebarOpen} />
          </div>
        </>
      )}

      <div
        className={cn('h-full transition-all duration-300 ease-in-out hidden md:block', isSidebarOpen ? 'w-64' : 'w-0')}
      >
        {isSidebarOpen && <ChatSidebar onClose={toggleSidebar} isOpen={isSidebarOpen} />}
      </div>

      <main
        className={cn(
          'flex-1 flex flex-col h-full transition-all duration-300 justify-end',
          messages.length === 0 ? 'pb-10 md:pb-[calc(50vh-100px)] bg-gradient-light' : 'pb-10 md:pb-16',
        )}
      >
        {messages.length === 0 && <div className="flex flex-col items-center justify-center flex-grow"></div>}
        {messages.length > 0 && <MessageList messages={messages} />}

        <div className="sticky bottom-0 w-full pt-3 pb-5 md:pb-8">
          <div className="text-center max-w-2xl mx-auto w-full px-4 pb-1">
            <h2 className={cn('text-xl font-semibold text-gray-700 mb-2', messages.length > 0 && 'hidden')}>
              {t('howCanIHelp')}
            </h2>
          </div>
          <ChatInput
            isRecording={isRecording}
            toggleRecording={toggleRecording}
            onSendMessage={handleSendMessage}
            language={language}
            setLanguage={setLanguage}
            className="px-4 min-w-4xl"
          />
          {messages.length === 0 && showSuggestions && (
            <QuickSuggestions
              quickQuestions={[
                'quickQuestions.violationsJeddah',
                'quickQuestions.violationsRiyadh',
                'quickQuestions.violationTypes',
              ]}
              onQuickQuestion={handleQuickQuestion}
              className="pt-3 px-4"
            />
          )}
        </div>
      </main>
    </div>
  )
}
