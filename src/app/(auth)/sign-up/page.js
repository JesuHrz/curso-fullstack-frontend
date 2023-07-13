'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

import { InputText } from '@/components/InputText'

import axios from '@/utils/axios'
import { SignUpValidation } from '@/utils/validations'
import { decode } from '@/utils/jwt'

import { useAuthStore } from '@/hooks/useAuthStore'

const initialValues = {
  name: '',
  email: '',
  password: ''
}

export default function SignUp () {
  const router = useRouter()
  // eslint-disable-next-line
  const [_, setAuthState] = useAuthStore((state) => state.jwt)
  const onSubmit = useCallback(async (values, actions) => {
    try {
      const response = await axios.post('/auth/sign-up', values)
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
      console.error('SignUp error:', e)
      actions.setSubmitting(false)
    }
  }, [setAuthState, router])

  const formik = useFormik({
    initialValues,
    validationSchema: SignUpValidation,
    onSubmit
  })

  const isDisabled = !formik.isValid || formik.isSubmitting || !formik.dirty

  return (
    <form className='flex flex-1 flex-col' onSubmit={formik.handleSubmit}>
      <p className='text-4xl font-bold'>Sign Up</p>
      <span className='text-base font-medium'>Please sign up to continue</span>
      <div className='flex flex-col mt-6 gap-1'>
        <InputText
          name='name'
          placeholder='Nombre'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : null}
        />
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
      <div className='mt-4 mb-2'>
        <input
          disabled={isDisabled}
          className='btn'
          type='submit'
          value='login'
        />
      </div>
      <span className='w-full block text-center text-slate-500'>Or</span>
      <div className='flex justify-center'>
        <Link href='/sign-in' className='text-slate-500 underline'>Sign In</Link>
      </div>
    </form>
  )
}
