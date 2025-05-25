'use client'

import {useState, useRef, useEffect, Dispatch, SetStateAction} from 'react'
import {Mic, Send} from 'lucide-react'
import {cn} from '@/lib/utils'
import {useTranslations} from 'use-intl'

interface ChatInputProps {
  isRecording: boolean
  handleRecording: () => void
  onSendMessage: (text: string) => void
  className?: string
  language: 'AR' | 'EN'
  setLanguage: Dispatch<SetStateAction<'AR' | 'EN'>>
}

export default function ChatInput({
  isRecording,
  handleRecording,
  onSendMessage,
  className,
  language,
  setLanguage,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const t = useTranslations()

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
    autoResizeTextarea()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue('')
      setTimeout(() => autoResizeTextarea(), 0)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event as unknown as React.FormEvent)
    }
  }



  if (isRecording) {
    return (
      <div className={cn('max-w-2xl mx-auto w-full', className)}>
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center justify-center h-[120px]">
          <div className="flex items-center space-x-1 mb-3">
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
            onClick={handleRecording}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-200 text-primary hover:bg-gray-300 cursor-pointer"
            aria-label="Stop recording"
          >
            <Mic size={22} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('max-w-2xl mx-auto w-full', className)}>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full rounded-lg border bg-white shadow-md p-4 space-y-3"
      >
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full py-2 px-3 bg-transparent focus:outline-none text-lg placeholder-muted-foreground resize-none overflow-y-auto min-h-[40px] max-h-[150px]"
          placeholder={t('typeMessage')}
          rows={1}
        />

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {/* Enhanced Language Toggle */}
            <div className="relative flex items-center bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md z-10",
                  language === 'AR'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                )}
                onClick={() => {
                  setLanguage('AR');
                }}
                aria-label="Switch to Arabic"
              >
                العربية
              </button>
              <button
                type="button"
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md z-10",
                  language === 'EN'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                )}
                onClick={() => {
                  setLanguage('EN');
                }}
                aria-label="Switch to English"
              >
                English
              </button>

              {/* Sliding background indicator */}
              <div
                className={cn(
                  "absolute top-1 bottom-1 bg-primary rounded-md transition-all duration-200 ease-in-out",
                  language === 'AR'
                    ? 'left-1 right-[50%]'
                    : 'left-[50%] right-1'
                )}
              />
            </div>
          </div>

          <div>
            {inputValue ? (
              <button
                type="submit"
                className="bg-primary text-white h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary/90 cursor-pointer"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRecording}
                className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-colors",
                  isRecording
                    ? "bg-red-500 text-white animate-pulse hover:bg-red-600"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
                aria-label={isRecording ? "Stop recording" : "Start voice recording"}
              >
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
