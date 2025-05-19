'use client'
import {Edit} from 'lucide-react'

type ChatHistoryPeriod = {
  title: string
  chats: string[]
}

export default function ChatSidebar() {
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
    <aside className="w-64 bg-gradient-light flex flex-col shadow-lg z-10 h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200/20 shrink-0">
        <button className="w-full button-gradient text-white rounded-md px-4 py-2 font-medium flex items-center justify-between shadow-sm">
          <span>New Chat</span>
          <Edit size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 px-4">
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
