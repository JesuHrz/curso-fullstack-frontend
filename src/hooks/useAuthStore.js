'use client'

import { useStore } from 'killa'
import authStore from '@/store/auth'

export function useAuthStore (selector = () => {}) {
  return useStore(authStore, selector)
}
