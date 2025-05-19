'use client'

import {useCallback} from 'react'
import type {Message} from '../page'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({messages}: MessageListProps) {
  const messagesEndRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      node.scrollIntoView({behavior: 'smooth'})
    }
  }, [])

  return (
    <div className="p-6 space-y-4">
      {messages.map(message => (
        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`rounded-lg p-3 max-w-md shadow-sm ${
              message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white text-foreground'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
