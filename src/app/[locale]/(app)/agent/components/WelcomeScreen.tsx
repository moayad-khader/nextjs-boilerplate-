'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import QuickSuggestions from './QuickSuggestions'

interface WelcomeScreenProps {
  language: 'AR' | 'EN'
  setLanguage: (lang: 'AR' | 'EN') => void
  onQuickQuestion: (question: string) => void
  className?: string
}

function WelcomeMessage({ language, setLanguage }: { language: 'AR' | 'EN'; setLanguage: (lang: 'AR' | 'EN') => void }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">How can I help you today?</h2>
      <div className="flex justify-center space-x-3 mb-6">
        <button
          className={`px-4 py-1.5 rounded-md transition-colors ${
            language === 'AR' ? 'button-gradient text-white font-medium' : 'hover:bg-white/50'
          }`}
          onClick={() => setLanguage('AR')}
        >
          AR
        </button>
        <button
          className={`px-4 py-1.5 rounded-md transition-colors ${
            language === 'EN' ? 'bg-white text-primary font-medium shadow-sm' : 'hover:bg-white/50'
          }`}
          onClick={() => setLanguage('EN')}
        >
          EN
        </button>
      </div>
    </>
  )
}

export default function WelcomeScreen({language, setLanguage, onQuickQuestion, className}: WelcomeScreenProps) {
  const quickQuestions = [
    'Number of violations in Jeddah',
    'Number of violating entities in Riyadh',
    'Type of violations',
  ]

  return (
    <div className={cn("inset-0 flex items-center justify-center overflow-auto py-8", className)}>
      <div className="text-center max-w-xl mx-auto px-4">
        <WelcomeMessage language={language} setLanguage={setLanguage} />
      </div>
    </div>
  )
}
