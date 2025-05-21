'use client'

import {useState, useRef, useEffect} from 'react'
import {Mic, Send} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  isRecording: boolean
  toggleRecording: () => void
  onSendMessage: (text: string) => void
  className?: string
}

export default function ChatInput({isRecording, toggleRecording, onSendMessage, className}: ChatInputProps) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue('')
    }
  }

  if (isRecording) {
    return (
      <div className={cn("max-w-2xl mx-auto w-full", className)}>
        <div className="relative bg-white rounded-full p-4 shadow-sm flex items-center justify-center">
          <div className="flex items-center space-x-1">
            {Array.from({length: 9}).map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-primary rounded-full animate-pulse"
                style={{
                  height: `${Math.max(12, Math.floor(Math.random() * 30))}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <button
            onClick={toggleRecording}
            className="absolute right-3 h-8 w-8 flex items-center justify-center rounded-full bg-white text-primary hover:bg-gray-50"
            aria-label="Stop recording"
          >
            <Mic size={18} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-full rounded-full border px-4 py-3 pr-12 bg-white shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="Message PerformIT"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {inputValue ? (
            <button
              type="submit"
              className="text-primary h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleRecording}
              className="text-primary h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Start voice recording"
            >
              <Mic size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
