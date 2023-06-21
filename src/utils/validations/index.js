import { object, string } from 'yup'

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
    .required('El nombre es requerido.'),
})
