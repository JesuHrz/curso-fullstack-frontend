import { Actions } from '@/components/Table'
import { BillingTable } from '@/components/Table/BillingTable'

export const metadata = {
  title: 'Dashboard | Curso FullStack - UNICOLOMBO',
  description: 'Dashboard | Curso FullStack - UNICOLOMBO'
}

const fake = [
  {
    id: 'A1',
    name: 'Claro Hogar',
    dateOfPaid: '20/06/2023',
    description: 'Short Description',
    price: 145000
  },
  {
    id: 'A2',
    name: 'AAA',
    dateOfPaid: '25/06/2023',
    description: 'pague el servicio del agua',
    price: 200000
  }
]

export default function Dashboard () {
  return (
    <main className='flex flex-1 flex-col p-20'>
      <h2 className='text-4xl font-semibold'>Facturas</h2>
      <p className='text-lg'>Administra tus facturas mes a mes</p>
      <div className='max-w-[900px] w-full mt-5'>
        <BillingTable
          data={fake}
          actions={[Actions.EDIT, Actions.REMOVE]}
        />
      </div>
    </main>
  )
}
