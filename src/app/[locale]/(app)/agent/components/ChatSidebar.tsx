'use client'
import { Edit, X, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'use-intl'
import { useChats } from '@/hooks/useChats'
import { useRouter, useSearchParams } from 'next/navigation'
import { Chat } from '@/types/chat'

// Helper function to group chats by time periods
function groupChatsByPeriod(chats: Chat[]) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

  const periods = {
    today: [] as Chat[],
    yesterday: [] as Chat[],
    lastWeek: [] as Chat[],
    lastMonth: [] as Chat[],
    older: [] as Chat[],
  }

  chats.forEach(chat => {
    const chatDate = new Date(chat.created_at)
    if (chatDate >= today) {
      periods.today.push(chat)
    } else if (chatDate >= yesterday) {
      periods.yesterday.push(chat)
    } else if (chatDate >= lastWeek) {
      periods.lastWeek.push(chat)
    } else if (chatDate >= lastMonth) {
      periods.lastMonth.push(chat)
    } else {
      periods.older.push(chat)
    }
  })

  return periods
}

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const t = useTranslations()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { chats, loading, error, refetch } = useChats()
  const currentChatId = searchParams.get('chatId')

  // Group chats by time periods
  const groupedChats = groupChatsByPeriod(chats)

  const handleNewChat = () => {
    // Remove chatId from URL to start a new chat
    const params = new URLSearchParams(searchParams.toString())
    params.delete('chatId')
    router.push(`?${params.toString()}`)
    // onClose()
  }

  const handleChatSelect = (chatId: string) => {
    // Update URL with selected chat ID
    const params = new URLSearchParams(searchParams.toString())
    params.set('chatId', chatId)
    router.push(`?${params.toString()}`)
    // onClose()
  }

  return (
    <aside
      className={cn(
        'w-64 bg-gradient-light flex flex-col z-10 h-full drop-shadow-lg transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >      <div className="p-4 border-b border-gray-200/20 shrink-0 flex items-center justify-between">
        <button
          onClick={handleNewChat}
          className="w-full button-gradient text-white rounded-md px-4 py-2 font-medium flex items-center justify-between shadow-sm mr-2"
        >
          <span>{t('newChat')}</span>
          <Plus size={18} />
        </button>
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <X size={20} className="text-white" />
        </button>
      </div>      <div className="flex-1 overflow-y-auto py-2 px-4">
        {loading ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            {t('loading')}...
          </div>
        ) : error ? (
          <div className="text-center text-sm text-red-500 py-4">
            <p>{t('errorLoadingChats')}</p>
            <button
              onClick={refetch}
              className="mt-2 text-xs underline hover:no-underline"
            >
              {t('retry')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Today's chats */}
            {groupedChats.today.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('today')}</h3>
                <div className="space-y-0.5">
                  {groupedChats.today.map(chat => (
                    <button
                      key={chat.chat_id}
                      onClick={() => handleChatSelect(chat.chat_id)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs rounded-md hover:bg-white/50 truncate",
                        currentChatId === chat.chat_id && "bg-white/30"
                      )}
                    >
                      {chat.chat_title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Yesterday's chats */}
            {groupedChats.yesterday.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('yesterday')}</h3>
                <div className="space-y-0.5">
                  {groupedChats.yesterday.map(chat => (
                    <button
                      key={chat.chat_id}
                      onClick={() => handleChatSelect(chat.chat_id)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs rounded-md hover:bg-white/50 truncate",
                        currentChatId === chat.chat_id && "bg-white/30"
                      )}
                    >
                      {chat.chat_title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Last week's chats */}
            {groupedChats.lastWeek.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('previous7Days')}</h3>
                <div className="space-y-0.5">
                  {groupedChats.lastWeek.map(chat => (
                    <button
                      key={chat.chat_id}
                      onClick={() => handleChatSelect(chat.chat_id)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs rounded-md hover:bg-white/50 truncate",
                        currentChatId === chat.chat_id && "bg-white/30"
                      )}
                    >
                      {chat.chat_title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Last month's chats */}
            {groupedChats.lastMonth.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('previous30Days')}</h3>
                <div className="space-y-0.5">
                  {groupedChats.lastMonth.map(chat => (
                    <button
                      key={chat.chat_id}
                      onClick={() => handleChatSelect(chat.chat_id)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs rounded-md hover:bg-white/50 truncate",
                        currentChatId === chat.chat_id && "bg-white/30"
                      )}
                    >
                      {chat.chat_title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Older chats */}
            {groupedChats.older.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t('older')}</h3>
                <div className="space-y-0.5">
                  {groupedChats.older.map(chat => (
                    <button
                      key={chat.chat_id}
                      onClick={() => handleChatSelect(chat.chat_id)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs rounded-md hover:bg-white/50 truncate",
                        currentChatId === chat.chat_id && "bg-white/30"
                      )}
                    >
                      {chat.chat_title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* No chats message */}
            {chats.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                <p>{t('noChatsYet')}</p>
                <p className="text-xs mt-1">{t('startNewConversation')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
