'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'

function DashboardContent() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <nav className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo className="text-2xl" />
            <Button onClick={logout} variant="secondary">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Welcome to your Dashboard</h2>
          <p className="text-gray-600">
            You are successfully authenticated and can access protected content here.
          </p>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
