'use client'

import React from 'react'

interface WelcomeScreenProps {
  language: 'AR' | 'EN'
  setLanguage: (lang: 'AR' | 'EN') => void
  onQuickQuestion: (question: string) => void
}

export default function WelcomeScreen({language, setLanguage, onQuickQuestion}: WelcomeScreenProps) {
  const quickQuestions = [
    'Number of violations in Jeddah',
    'Number of violating entities in Riyadh',
    'Type of violations',
  ]

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-auto py-8">
      <div className="text-center max-w-xl mx-auto px-4">
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

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {quickQuestions.map((question, idx) => (
              <button
                key={idx}
                className="bg-white rounded-full px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow"
                onClick={() => onQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
            <button className="bg-white rounded-full px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow">
              More
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {quickQuestions.map((question, idx) => (
              <button
                key={`second-${idx}`}
                className="bg-white rounded-full px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow"
                onClick={() => onQuickQuestion(question)}
              >
                {question}
              </button>
            ))}
            <button className="bg-white rounded-full px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow">
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
