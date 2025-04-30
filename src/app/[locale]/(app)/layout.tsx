import type {ReactNode} from 'react'
import Toolbar from '@/components/Toolbar'

export default function AppLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toolbar />
      {children}
    </div>
  )
}
