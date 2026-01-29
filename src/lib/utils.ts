export const storage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('token', token)
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('token')
  },
}

export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
