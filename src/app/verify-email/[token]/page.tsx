'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { api } from '@/lib/api'
import { formatError } from '@/lib/utils'
import { useToast } from '@/contexts/ToastContext'

export default function VerifyEmailPage() {
  const params = useParams()
  const router = useRouter()
  const token = params?.token as string
  const { showToast } = useToast()
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Invalid verification link')
      return
    }

    const verifyEmail = async () => {
      try {
        await api.verifyEmail(token)
        setStatus('success')
        setMessage('Email verified successfully! You can now login.')
        showToast('Email verified successfully!', 'success')
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } catch (err) {
        setStatus('error')
        setMessage(formatError(err))
        showToast(formatError(err), 'error')
      }
    }

    verifyEmail()
  }, [token, router, showToast])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <div className="text-center mb-6">
            <Logo className="text-4xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
          </div>

          {status === 'verifying' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-green-600 font-medium">{message}</p>
              <p className="text-sm text-gray-600">Redirecting to login...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <p className="text-red-600 font-medium">{message}</p>
              <div className="pt-4 space-y-2">
                <Link href="/login">
                  <Button className="w-full">Go to Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="secondary" className="w-full">Sign Up Again</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
