import axios from 'axios'

import authStore, { AUTH_STORE_INITIAL_STATE } from '@/store/auth'
import billingsStore, { BILLINGS_STORE_INITIAL_STATE } from '@/store/billings'

import { ApiError } from '@/utils/errors'

const instance = axios.create({
  baseURL: 'http://localhost:3005/api'
})

instance.interceptors.request.use(
  (config) => {
    const token = authStore.getState()?.jwt
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response: { status, config, data } } = error

    if (status === 401 && config.headers.Authorization) {
      [
        [authStore, AUTH_STORE_INITIAL_STATE],
        [billingsStore, BILLINGS_STORE_INITIAL_STATE]
      ].forEach(([store, initialValue]) => {
        store.setState(() => initialValue)
      })
    }

    throw new ApiError({ message: data?.message, code: data?.code })
  }
)

export default instance
