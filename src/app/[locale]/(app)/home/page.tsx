'use client'
import {useSession} from 'next-auth/react'
import Link from 'next/link'
import {Loader2} from 'lucide-react'

interface Category {
  name: string
  href: string
}

export default function HomePage() {
  const {data: session, status} = useSession()

  const userName = session?.user?.name || 'ELM'

  const categories: Category[] = [
    {name: 'Marketing', href: '#marketing'},
    {name: 'Development', href: '#development'},
    {name: 'IT', href: '#it'},
    {name: 'UX design', href: '#ux-design'},
    {name: 'Stores', href: '#stores'},
    {name: 'Foods', href: '#foods'},
  ]

  if (status === 'loading') {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-light min-h-full px-16 py-20">
      <div className="mb-16 ml-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome {userName}!</h1>
        <h2 className="text-xl text-gray-600">Start Your Journey Here!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl ml-4">
        {categories.map(category => (
          <Link
            key={category.name}
            href={category.href}
            className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-medium text-gray-800">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
