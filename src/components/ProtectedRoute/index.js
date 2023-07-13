'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Spiral } from '@phosphor-icons/react'
import colors from 'tailwindcss/colors'

import { useAuthStore } from '@/hooks/useAuthStore'

export const ProtectedRoute = ({ children, isProtected = true }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [{ isAuthenticated, jwt }] = useAuthStore((state) => {
    return {
      isAuthenticated: state.isAuthenticated,
      jwt: state.jwt
    }
  })

  useEffect(() => {
    if (isProtected) {
      if (!isAuthenticated()) {
        router.replace('/sign-in')
        return
      }
    }

    if (!isProtected) {
      if (isAuthenticated()) {
        router.replace('/dashboard')
        return
      }
    }

    setIsLoading(false)
  }, [isAuthenticated, isProtected, router, jwt])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin'>
          <Spiral size={40} color={colors.blue[950]} />
        </div>
      </div>
    )
  }

  return children
}
