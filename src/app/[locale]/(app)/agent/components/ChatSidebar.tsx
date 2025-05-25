'use client'
import {Edit, X} from 'lucide-react'
import {cn} from '@/lib/utils'
import {useTranslations} from 'use-intl'

type ChatHistoryPeriod = {
  title: string
  chats: string[]
}

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatSidebar({isOpen, onClose}: ChatSidebarProps) {
  const t = useTranslations()
  const chatHistory: ChatHistoryPeriod[] = [
    {
      title: 'Today',
      chats: Array(5).fill('The number of violations in barber shops'),
    },
    {
      title: 'Yesterday',
      chats: Array(6).fill('The number of violations in barber shops'),
    },
    {
      title: 'Previous 7 Days',
      chats: Array(6).fill('The number of violations in barber shops'),
    },
    {
      title: 'Previous 30 Days',
      chats: Array(1).fill('The number of violations in barber shops'),
    },
  ]

  return (
    <aside
      className={cn(
        'w-64 bg-gradient-light flex flex-col z-10 h-full drop-shadow-lg transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="p-4 border-b border-gray-200/20 shrink-0 flex items-center justify-between">
        <button className="w-full button-gradient text-white rounded-md px-4 py-2 font-medium flex items-center justify-between shadow-sm mr-2">
          <span>{t('newChat')}</span>
          <Edit size={18} />
        </button>
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-4 ">
        <div className="space-y-4">
          {chatHistory.map((period, idx) => (
            <section key={idx}>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">{period.title}</h3>
              <div className="space-y-0.5">
                {period.chats.map((chat, chatIdx) => (
                  <button
                    key={chatIdx}
                    className="w-full text-left px-2 py-1 text-xs rounded-md hover:bg-white/50 truncate"
                  >
                    {chat}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </aside>
  )
}
