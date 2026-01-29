'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { useToast } from '@/contexts/ToastContext'
import { api } from '@/lib/api'
import { getValidationErrors } from '@/lib/validation'
import { formatError } from '@/lib/utils'

export default function ResetPasswordPage() {
  const params = useParams()
  const router = useRouter()
  const token = params?.token as string
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    password?: string
    confirmPassword?: string
  }>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    if (!token) {
      router.push('/forgot-password')
    }
  }, [token, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    const passwordError = getValidationErrors('password', password)
    const confirmPasswordError = password !== confirmPassword ? 'Passwords do not match' : null
    
    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
      })
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await api.resetPassword(token, password)
      setSuccess(true)
      showToast('Password reset successfully!', 'success')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      const errorMessage = formatError(err)
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <div className="text-center mb-6">
            <Logo className="text-4xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          </div>
          
          {success ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                Password reset successfully! Redirecting to login...
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="password"
                  label="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  placeholder="Enter new password"
                  disabled={isLoading}
                />

                <Input
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />

                <Button type="submit" isLoading={isLoading} className="w-full">
                  Reset Password
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
