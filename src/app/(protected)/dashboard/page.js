'use client'

import { useEffect } from 'react'

import { Actions } from '@/components/Table'
import { BillingTable } from '@/components/Table/BillingTable'

// import * as alerts from '@/utils/alerts'
import axios from '@/utils/axios'
import { useBillingsStore } from '@/hooks/useBillingsStore'

export default function Dashboard () {
  const [billings, setBillings] = useBillingsStore((state) => state.billings)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/billings')
        const { data } = response.data || {}
        setBillings(() => {
          return {
            billings: data?.billings
          }
        })
      } catch (e) {
        // alerts.error('error')
        console.error('Get billings error:', e)
      }
    })()
  }, [setBillings])

  return (
    <main className='flex flex-1 flex-col p-20'>
      <h2 className='text-4xl font-semibold'>Facturas</h2>
      <p className='text-lg'>Administra tus facturas mes a mes</p>
      <div className='max-w-[900px] w-full mt-5'>
        <BillingTable
          data={billings || []}
          actions={[Actions.EDIT, Actions.REMOVE]}
        />
      </div>
    </main>
  )
}
