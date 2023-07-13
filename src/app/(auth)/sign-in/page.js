'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'

import { InputText } from '@/components/InputText'

import axios from '@/utils/axios'
// import * as alerts from '@/utils/alerts'
import { emailAndPasswordValidation } from '@/utils/validations'
import { decode } from '@/utils/jwt'
import { useAuthStore } from '@/hooks/useAuthStore'

const initialValues = {
  email: '',
  password: ''
}

export default function SignIn () {
  const router = useRouter()
  // eslint-disable-next-line
  const [_, setAuthState] = useAuthStore((state) => state.jwt)
  const onSubmit = useCallback(async (values, actions) => {
    try {
      const response = await axios.post('/auth/sign-in', values)
      const { data } = response.data
      const user = decode(data.jwt)

      setAuthState(() => {
        return {
          jwt: data.jwt,
          user
        }
      })

      router.replace('/dashboard')
    } catch (e) {
      // alerts.error(e.message)
      actions.setSubmitting(false)
    }
  }, [router, setAuthState])

  const formik = useFormik({
    initialValues,
    validationSchema: emailAndPasswordValidation,
    onSubmit
  })

  const isDisabled = !formik.isValid || formik.isSubmitting || !formik.dirty

  return (
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
  )
}
