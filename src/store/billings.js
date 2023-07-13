import killa from 'killa'
import { persist } from 'killa/persist'

import { BILLINGS_STORE_KEY } from '@/utils/constants'

export const BILLINGS_STORE_INITIAL_STATE = {
  billings: []
}

const store = killa(
  BILLINGS_STORE_INITIAL_STATE,
  {
    use: [
      persist({ name: BILLINGS_STORE_KEY })
    ]
  }
)

export default store
