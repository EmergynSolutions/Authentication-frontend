'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-white">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <Logo className="text-5xl md:text-6xl" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Welcome to Emergyn
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Secure authentication system to get you started quickly and safely
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/login" className="w-full sm:w-auto">
            <Button className="w-full sm:w-40 text-lg py-3">Sign In</Button>
          </Link>
          <Link href="/signup" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-40 text-lg py-3">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
