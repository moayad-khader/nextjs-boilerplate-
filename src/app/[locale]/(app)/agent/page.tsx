'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'
import { useSession, signIn } from 'next-auth/react'
import { Loader2, Menu } from 'lucide-react'
import ChatSidebar from './components/ChatSidebar'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import { cn } from '@/lib/utils'
import QuickSuggestions from './components/QuickSuggestions'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'

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
  const { data: session, status } = useSession()

  const [language, setLanguage] = useState<'AR' | 'EN'>('EN')
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const isSmallScreen = useIsSmallScreen()
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmallScreen)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn()
    }
  }, [session])

  const handleSendMessage = (text: string) => {
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

    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        text: `
# Comprehensive Report on Violations in Barber Shops

---

## Executive Summary

A total of **42 violations** have been reported in barber shops located in Jeddah. This article provides a detailed breakdown, relevant data, and sample code for further analysis.

---
        `.trim(),
        timestamp: new Date(),
        report: {
          content: "This is a sample report content with detailed statistics and analysis.",
        },
        graph: {
          graphType: 1,
          graphData: [
            { name: 'Barber Shop A', messages: 12, responses: 5 },
            { name: 'Barber Shop B', messages: 8, responses: 3 },
            { name: 'Others', messages: 22, responses: 10 },
          ],
        },
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  useEffect(() => {
    setIsSidebarOpen(!isSmallScreen)
  }, [isSmallScreen])

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
