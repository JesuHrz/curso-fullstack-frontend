'use client'

import { useState, useMemo, useCallback } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import colors from 'tailwindcss/colors'
import { useFormik } from 'formik'
import { Pen, Trash, Plus, X } from '@phosphor-icons/react'

import { Modal } from '@/components/Modal'
import { InputText } from '@/components/InputText'
import { Table, Actions } from '@/components/Table'
import { Calendar } from '@/components/Calendar'

import { currencyFormat } from '@/utils/currency'
import { billingValidation } from '@/utils/validations'

const initialValues = {
  name: '',
  description: '',
  dateOfPaid: '',
  price: ''
}

export function BillingTable ({ data, actions }) {
  const [dateFilter, setDateFilter] = useState(new Date())
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState(null)
  const columnHelper= useMemo(() => createColumnHelper(data), [data])

  const onSubmit = useCallback((value, actions) => {
    if (value.id) {
      console.log('UPDATE')
      // TODO: Implement the logic for updating the billing data
    } else {
      console.log('CREATE')
      // TODO: Implement the logic for creating a new billing data
    }

    // This simulates a hit to the API
    setTimeout(() => {
      actions.setSubmitting(false)
    }, 3000)
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema: billingValidation,
    onSubmit,
  })

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true)
    formik.resetForm()
    setSelectedBilling(null)
  }, [formik])
  const handleCloseModal = useCallback(() => setIsOpenModal(false), [])
  const handleEditBilling = useCallback((billing) => {
    setIsOpenModal(true)
    formik.setValues({ ...billing })
    setSelectedBilling(billing)
  }, [formik])

  const columns = useMemo(() => {
    const _columns = [
      columnHelper.accessor('autoIncrement', {
        header: () => '#',
        cell: info => parseInt(info.row.id) + 1
      }),
      columnHelper.accessor('name', {
        header: () => 'Servicio',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('description', {
        header: () => 'Descripcion',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('dateOfPaid', {
        header: () => 'Fecha del pago',
        cell: info => info.getValue()
      }),
      columnHelper.accessor('price', {
        header: () => 'Valor',
        cell: info => currencyFormat(info.getValue()),
        footer: () => {
          const total = data.reduce((acc, cur) => {
            return acc + cur.price
          }, 0)

          return (
            <div className='flex flex-col'>
              <span>Total</span>
              <span>{currencyFormat(total)}</span>
            </div>
          )
        }
      }),
    ]

    if (Array.isArray(actions)) {
      _columns.push(columnHelper.accessor('actions', {
        header: () => 'Acciones',
        cell: info => {
          return (
            <div className='flex justify-center gap-2'>
              {
                actions.includes(Actions.EDIT) && (
                  <Pen
                    className='cursor-pointer'
                    onClick={() => handleEditBilling(info.row.original)}
                    size={22}
                    color={colors.slate[400]}
                  />
                )
              }
              {
                actions.includes(Actions.REMOVE) && (
                  <Trash
                    className='cursor-pointer'
                    onClick={() => console.log('REMOVE', info.row.original)}
                    size={22}
                    color={colors.slate[400]}
                  />
                )
              }
            </div>
          )
        },
      }),)
    }

    return _columns
  }, [columnHelper, data, actions, handleEditBilling])

  const isDisabled = !formik.isValid || formik.isSubmitting || !formik.dirty

  return (
    <div>
      <div className='my-1 flex justify-between pr-1'>
        <Plus
          onClick={handleOpenModal}
          className='cursor-pointer'
          size={24}
          color={colors.blue[950]}
        />
        <Calendar
          value={dateFilter}
          onChange={(month) =>  setDateFilter(month)}
        />
      </div>
      <Table data={data} columns={columns} />
      <Modal
        isOpen={isOpenModal}
        closeModal={handleCloseModal}
      >
        <div className='w-[400px]'>
          <h2 className='text-2xl font-semibold'>{ selectedBilling ? 'Editar' : 'Crear' } Factura</h2>
          <X
            className='cursor-pointer absolute top-2 right-2'
            onClick={handleCloseModal}
            color={colors.blue[950]}
            size={24}
          />
          <form className='flex flex-1 flex-col mt-2' onSubmit={formik.handleSubmit}>
            <div>
              <InputText
                name='name'
                placeholder='Servicio'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : null}
              />
              <InputText
                name='description'
                placeholder='Descripcion (Optional)'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.description && formik.errors.description ? formik.errors.description : null}
              />
              <InputText
                name='dateOfPaid'
                placeholder='Fecha de pago'
                value={formik.values.dateOfPaid}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.dateOfPaid && formik.errors.dateOfPaid ? formik.errors.dateOfPaid : null}
              />
              <InputText
                type='number'
                name='price'
                placeholder='Valor'
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.price && formik.errors.price ? formik.errors.price : null}
              />
            </div>
            <div className='mt-2'>
              <input
                disabled={isDisabled}
                className='btn'
                type='submit'
                value='Guardar'
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
