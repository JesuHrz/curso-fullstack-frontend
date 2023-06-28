import { useState, useCallback } from 'react'
import classNames from 'classnames'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import colors from 'tailwindcss/colors'

export function InputText ({ className, errorMessage = null, type = 'text', ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordType = type === 'password'
  const currentType = isPasswordType ? (showPassword ? 'text' : 'password') : type
  const handleShowPassword = useCallback(() => setShowPassword(state => !state), [])

  return (
    <div className='min-h-[72px]'>
      <div className='flex relative justify-center'>
        <input
          className={
            classNames(
              'input-text',
              { '!pr-[42px]': isPasswordType },
              className
            )
          }
          type={currentType}
          {...props}
        />
        {
          isPasswordType && (
            <div className='absolute right-3 top-3 cursor-pointer'>
              {
                showPassword
                  ? <Eye onClick={handleShowPassword} size={24} color={colors.slate[400]} />
                  : <EyeClosed onClick={handleShowPassword} size={24} color={colors.slate[400]} />
              }
            </div>
          )
        }
      </div>
      {errorMessage && <span className='text-xs text-red-500 ml-1'>{errorMessage}</span>}
    </div>
  )
}
