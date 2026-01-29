'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { getValidationErrors } from '@/lib/validation'
import { formatError } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    const emailError = getValidationErrors('email', email)
    const passwordError = getValidationErrors('password', password)
    
    if (emailError || passwordError) {
      setErrors({ email: emailError || undefined, password: passwordError || undefined })
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await login({ email, password })
      showToast('Login successful!', 'success')
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
            <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          </div>
          
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

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
              disabled={isLoading}
            />

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/signup" className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
