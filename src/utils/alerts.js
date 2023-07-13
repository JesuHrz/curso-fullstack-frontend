import toast from 'react-hot-toast'

export const notify = (message) => toast.success(message)
export const error = (message) => toast.error(message)
