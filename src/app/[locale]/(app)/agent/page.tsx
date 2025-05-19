'use client'

import {useEffect, useState} from 'react'
import {useTranslations} from 'use-intl'
import {useSession, signIn} from 'next-auth/react'
import {Loader2} from 'lucide-react'
import ChatSidebar from './components/ChatSidebar'
import WelcomeScreen from './components/WelcomeScreen'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

export type Message = {
  id: string
  type: 'user' | 'agent'
  text: string
  timestamp: Date
}

export default function AgentPage() {
  const t = useTranslations()
  const {data: session, status} = useSession()

  const [language, setLanguage] = useState<'AR' | 'EN'>('EN')
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn()
    }
  }, [session])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) {
      return
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])

    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        text: 'I found information about violations in barber shops. Would you like specific statistics?',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, responseMessage])
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  if (status === 'loading') {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div className="h-full overflow-hidden">
        <ChatSidebar />
      </div>

      <main className="flex-1 flex flex-col bg-gradient-light h-full">
        <div className="flex-1 min-h-0 relative">
          {messages.length === 0 ? (
            <WelcomeScreen language={language} setLanguage={setLanguage} onQuickQuestion={handleQuickQuestion} />
          ) : (
            <div className="absolute inset-0 overflow-auto">
              <MessageList messages={messages} />
            </div>
          )}
        </div>

        <div className="border-t border-gray-200/20 bg-gradient-light p-4">
          <ChatInput isRecording={isRecording} toggleRecording={toggleRecording} onSendMessage={handleSendMessage} />
        </div>
      </main>
    </div>
  )
}
