'use client'
import {createContext, useContext, useState, ReactNode} from 'react'

interface AppContextType {
  currentOrganization: string | null
  setCurrentOrganization: (org: string | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({children}: {children: ReactNode}) {
  const [currentOrganization, setCurrentOrganization] = useState<string | null>(null)

  return <AppContext.Provider value={{currentOrganization, setCurrentOrganization}}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
