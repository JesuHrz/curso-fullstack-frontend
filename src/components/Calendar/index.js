'use client'

import { useState, useCallback } from 'react'
import DefaultCalendar from 'react-calendar'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Calendar as CalendarIcon } from '@phosphor-icons/react'
import colors from 'tailwindcss/colors'

export function Calendar ({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleIsOpen = useCallback(() => setIsOpen(state => !state), [])

  const handleChange = useCallback((month) => {
    onChange(month)
    setIsOpen(false)
  }, [onChange])

  return (
    <div>
      <div
        className='flex items-center gap-1 cursor-pointer'
        onClick={handleIsOpen}
      >
        <span className='capitalize'>{format(value, 'MMMM, yyyy', { locale: es })}</span>
        <CalendarIcon
          size={26}
          color={colors.blue[950]}
        />
      </div>
      {
        isOpen && (
          <DefaultCalendar
            view='year'
            className='absolute'
            onClickMonth={handleChange}
            value={value}
            locale='es'
          />
        )
      }
    </div>
  )
}
