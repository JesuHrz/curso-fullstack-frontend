import { object, string, number } from 'yup'

export const emailAndPasswordValidation = object({
  email: string()
    .email('Correo inválido')
    .required('El correo es requerido.'),
  password: string()
    .min(8, 'La contraseña es demasiado corta')
    .required('El contraseña es requerido.')
})

export const SignUpValidation = emailAndPasswordValidation.shape({
  name: string()
    .required('El nombre es requerido.')
})

export const billingValidation = object({
  name: string().required('El nombre del servicio es requerido.'),
  description: string().optional(),
  dateOfPaid: string().required('La fecha de pago es requerido.'),
  price: number().positive().integer().required('El valor de la factura es requerido.'),
})
