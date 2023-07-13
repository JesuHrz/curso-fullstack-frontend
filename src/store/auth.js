import killa from 'killa'
import { persist } from 'killa/persist'

import { isWindow } from '@/utils/libs'
import { APP_SESSION_KEY } from '@/utils/constants'

export const AUTH_STORE_INITIAL_STATE = {
  jwt: '',
  user: {},
  isAuthenticated
}

const store = killa(
  AUTH_STORE_INITIAL_STATE,
  {
    use: [
      persist({ name: APP_SESSION_KEY })
    ]
  }
)

function isAuthenticated () {
  if (isWindow) {
    const { user, jwt } = store.getState() || {}
    const expiresAt = user?.exp * 1000

    return (jwt && expiresAt) && (new Date().getTime() < expiresAt)
  }
}

export default store
