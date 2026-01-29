'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/utils'
import { api, LoginData, RegisterData } from '@/lib/api'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginData) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = storage.getToken()
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const login = async (data: LoginData) => {
    const response = await api.login(data)
    if (response.token) {
      storage.setToken(response.token)
      setIsAuthenticated(true)
      router.push('/dashboard')
    }
  }

  const register = async (data: RegisterData) => {
    await api.register(data)
  }

  const logout = () => {
    storage.removeToken()
    setIsAuthenticated(false)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
