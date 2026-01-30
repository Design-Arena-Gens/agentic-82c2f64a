'use client'

import { useState } from 'react'
import BusinessAnalysisForm from '@/components/BusinessAnalysisForm'
import Dashboard from '@/components/Dashboard'
import { BusinessProfile } from '@/types'

export default function Home() {
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {!businessProfile ? (
        <BusinessAnalysisForm onComplete={setBusinessProfile} />
      ) : (
        <Dashboard businessProfile={businessProfile} onReset={() => setBusinessProfile(null)} />
      )}
    </main>
  )
}
