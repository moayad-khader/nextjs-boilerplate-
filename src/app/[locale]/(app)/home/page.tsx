'use client'
import {useSession} from 'next-auth/react'
import Link from 'next/link'
import {Loader2} from 'lucide-react'
import {useEffect, useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Organization, organizationsSchema} from '@/types/organization'

const fetchOrganizations = async (accessToken: string) => {
  const res = await fetch('/api/user/organizations', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch organizations')
  }
  const data = organizationsSchema.safeParse(await res.json())
  if (!data.success) {
    return []
  }
  return data.data
}

export default function HomePage() {
  const {data: session, status} = useSession()

  const {data: orgsData, isLoading: orgsLoading} = useQuery({
    queryKey: ['organizations', session?.accessToken],
    queryFn: () => fetchOrganizations(session!.accessToken as string),
    enabled: status === 'authenticated' && !!session?.accessToken,
  })

  const userName = session?.user?.name || 'ELM'

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
      <div className="flex justify-center">
        {orgsLoading ? (
          <div className="flex items-center justify-center min-h-[160px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading organizations...</span>
          </div>
        ) : orgsData && orgsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {orgsData.map((org: Organization) => (
              <Link
                key={org.organization_id}
                href={`/organizations/${org.organization_id}`}
                className="bg-white rounded-2xl shadow-md p-12 hover:shadow-lg transition-shadow min-h-[160px] flex items-center justify-center"
              >
                <h3 className="text-2xl font-semibold text-gray-800">{org.organization_name}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-lg">No organizations found.</div>
        )}
      </div>
    </div>
  )
}
