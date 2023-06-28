import { createElement } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

export const NavLink = ({
  as = '',
  href = '',
  active = false,
  disabled = false,
  icon = null,
  children,
  ...props
}) => {
  const _props = {
    ...props,
    className: classNames(
      'relative flex items-center gap-1 text-white text-base py-2',
      {
        'before:content-[""] before:h-full before:w-[3px] before:bg-white before:-left-[6px] before:absolute before:rounded-lg': active,
        'pointer-events-none': disabled
      }
    )
  }

  if (as) {
    return createElement(as, _props, icon, children)
  }

  return (
    <Link href={href} {..._props}>
      {icon}
      {children}
    </Link>
  )
}
