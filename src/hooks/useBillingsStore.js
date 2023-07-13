'use client'

import { useStore } from 'killa'
import billingsStore from '@/store/billings'

export function useBillingsStore (selector = () => {}) {
  return useStore(billingsStore, selector)
}
