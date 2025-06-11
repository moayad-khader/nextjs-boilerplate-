import Toolbar from '@/components/Toolbar'
import type { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Toolbar />
      <div className="flex-1 min-h-0 bg-background text-foreground">{children}</div>
    </div>
  )
}
