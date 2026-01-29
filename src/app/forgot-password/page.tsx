'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { useToast } from '@/contexts/ToastContext'
import { api } from '@/lib/api'
import { getValidationErrors } from '@/lib/validation'
import { formatError } from '@/lib/utils'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string }>({})
  const { showToast } = useToast()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    
    const emailError = getValidationErrors('email', email)
    
    if (emailError) {
      setErrors({ email: emailError })
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await api.forgotPassword(email)
      setSuccess(true)
      showToast('If an account exists with this email, a password reset link has been sent.', 'info', 6000)
    } catch (err) {
      const errorMessage = formatError(err)
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <div className="text-center mb-6">
            <Logo className="text-4xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
          </div>
          
          {success ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                If an account exists with this email, a password reset link has been sent.
              </div>
              <div className="text-center">
                <Link href="/login" className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                  Back to login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm mb-6 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />

                <Button type="submit" isLoading={isLoading} className="w-full">
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link href="/login" className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
