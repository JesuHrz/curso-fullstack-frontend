import Image from 'next/image'
import Link from 'next/link'

export default function SignUp () {
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
            <form className="flex flex-1 flex-col">
              <p className="text-4xl font-bold">Sign Up</p>
              <span className="text-base font-medium">Please sign up to continue</span>
              <div className="flex flex-col mt-6 gap-1">
                <input
                  className="input-text"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <input
                  className="input-text"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-4">
                <input
                  className="btn"
                  type="submit"
                  value='login'
                />
              </div>
              <span className="w-full block text-center text-slate-500 my-4">Or</span>
              <div className="flex justify-center">
                <Link href='/sign-in' className='text-slate-500 underline'>Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
