import Image from 'next/image'

export function AuthLayout ({ children }) {
  return (
    <main className='flex justify-center min-h-screen bg-white md:bg-backgroundColor md:items-center'>
      <div className='container flex justify-center'>
        <div className='flex justify-center max-w-6xl w-full md:bg-blue-100 md:rounded-3xl md:items-center md:mb-20 h-[544px]'>
          <div className='hidden relative h-[380px] md:flex md:flex-1'>
            <Image
              src='/welcome.png'
              alt='Welcome image'
              fill
            />
          </div>
          <div className='flex mt-40 flex-1 justify-center bg-white md:py-20 md:px-10 md:rounded-3xl md:mt-0 h-full'>
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
