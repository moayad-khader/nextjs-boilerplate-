'use client'
import { useCallback } from 'react'
import type { Message } from '../page'

import React from 'react'
import { cn } from '@/lib/utils'
import MessageTextComponent from './MessageText'
import MessageReportComponent from './MessageReport'
import MessageGraphComponent from './MessageGraph'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return (
    <div className="p-6 space-y-4 overflow-y-auto px-[15%]"
    >
      {messages.map((message, idx) => (
        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={cn(`flex flex-col gap-2 rounded-lg p-3 shadow-sm transition-all duration-300 opacity-0 translate-y-4 animate-fade-in-up`, `${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white text-foreground'}`)}
            style={{
              animationDelay: `${60 * idx}ms`,
              maxWidth: '60vw',
            }}
          >
            {message.type === 'agent' && <MessageReportComponent message={message} />}
            <MessageTextComponent message={message} />
            {message.type === 'agent' && <MessageGraphComponent message={message} />}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <style jsx>{`
      @keyframes fade-in-up {
      from {
      opacity: 0;
      transform: translateY(16px);
      }
      to {
      opacity: 1;
      transform: translateY(0);
      }
      }
      .animate-fade-in-up {
      animation: fade-in-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }
      `}</style>
    </div>
  )
}
