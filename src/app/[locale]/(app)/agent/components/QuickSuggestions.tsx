import {cn} from '@/lib/utils'
import React from 'react'
import {useTranslations} from 'use-intl'

interface QuickSuggestionsProps {
  quickQuestions: string[]
  onQuickQuestion: (question: string) => void
  className?: string
}

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({quickQuestions, onQuickQuestion, className}) => {
  const t = useTranslations()
  return (
    <div className={cn('flex flex-wrap gap-2 justify-center my-4', className)}>
      {quickQuestions.map((question, idx) => (
        <button
          key={`second-${idx}`}
          className="bg-white rounded-full px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow cursor-pointer"
          onClick={() => onQuickQuestion(question)}
        >
          {t(question)}
        </button>
      ))}
      <button className="bg-white rounded-full px-4 py-2 text-sm shadow-sm hover:shadow transition-shadow cursor-pointer">
        {t('more')}
      </button>
    </div>
  )
}

export default QuickSuggestions
