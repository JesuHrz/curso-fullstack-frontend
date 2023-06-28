'use client'

import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import classNames from 'classnames'

export function Table ({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <table className='w-full'>
      <thead>
        {
          table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {
                headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={classNames('p-1', { 'w-[10%]': !header.index })}
                  >
                    {
                      header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody>
        {
          table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {
                row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='text-center p-1'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        {
          table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {
                footerGroup.headers.map(header => (
                  <th key={header.id} className='p-1'>
                    {
                      header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </tfoot>
    </table>
  )
}
