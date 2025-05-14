import Toolbar from '@/components/Toolbar'
import type {ReactNode} from 'react'

export default function AppLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Toolbar />
      <div className="min-h-screen bg-background text-foreground">{children}</div>
    </>
  )
}
