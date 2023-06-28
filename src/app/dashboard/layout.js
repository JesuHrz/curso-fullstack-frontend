'use client'

import Modal from 'react-modal'
import { useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { House, User, Gear, SignOut } from '@phosphor-icons/react'
import colors from 'tailwindcss/colors'

import { NavLink } from '@/components/NavLink'

if (typeof window !== 'undefined') {
  Modal.setAppElement(document.body)
}

export default function Layout ({ children }) {
  const pathName = usePathname()
  const isActive = useCallback((link) => link === pathName, [pathName])

  return (
    <main className='flex h-screen bg-white overflow-hidden'>
      <div className='flex flex-col bg-blue-500 h-full py-10 px-5 basis-[300px]'>
        <div className='flex items-center gap-2'>
          <Image
            className='rounded-lg'
            src='/profile.png'
            alt='Avatar image'
            width={80}
            height={80}
          />
          <div className='block text-ellipsis whitespace-nowrap overflow-hidden text-white'>
            <p className='font-semibold text-lg'>Jesus Hernandez</p>
            <span className='text-base' title='jesus.hernandez@unicolombo.edu.co'>jesus.hernandez@unicolombo.edu.co</span>
          </div>
        </div>
        <nav className='mt-8 h-full'>
          <ul className='flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-1'>
              <li>
                <NavLink
                  href='/dashboard'
                  icon={<House size={26} color={colors.white} />}
                  active={isActive('/dashboard')}
                >
                  Facturas
                </NavLink>
              </li>
              <li>
                <NavLink
                  href='/dashboard/profile'
                  icon={<User size={26} color={colors.white} />}
                  active={isActive('/dashboard/profile')}
                >
                  Perfil
                </NavLink>
              </li>
            </div>
            <div className='flex flex-col gap-1'>
              <li>
                <NavLink
                  href='/dashboard/settings'
                  icon={<Gear size={26} color={colors.white} />}
                  disabled
                >
                  Configuraciones
                </NavLink>
              </li>
              <li>
                <NavLink
                  as='button'
                  icon={<SignOut size={26} color={colors.white} />}
                >
                  Cerrar session
                </NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </div>
      <div className='flex flex-1'>
        {children}
      </div>
    </main>
  )
}
