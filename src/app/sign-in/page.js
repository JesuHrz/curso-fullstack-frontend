'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFormik } from 'formik'

import { InputText } from '@/components/InputText'

import { emailAndPasswordValidation } from '@/utils/validations'

const initialValues = {
  email: '',
  password: ''
}

export default function SignIn () {
  const onSubmit = useCallback((value, actions) => {
    console.log('value', value)

    // This simulates a hit to the API
    setTimeout(() => {
      actions.setSubmitting(false)
    }, 3000)
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: emailAndPasswordValidation,
    onSubmit
  })

  const isDisabled = !formik.isValid || formik.isSubmitting || !formik.dirty

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
            <form className='flex flex-1 flex-col' onSubmit={formik.handleSubmit}>
              <p className='text-4xl font-bold'>Login</p>
              <span className='text-base font-medium'>Please login to continue</span>
              <div className='flex flex-col mt-6 gap-1'>
                <InputText
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                />
                <InputText
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                />
              </div>
              <div className='my-4'>
                <input
                  disabled={isDisabled}
                  className='btn'
                  type='submit'
                  value='login'
                />
              </div>
              <span className='w-full block text-center text-slate-500'>Or</span>
              <div className='flex justify-center'>
                <Link href='/sign-up' className='text-slate-500 underline'>Create account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
