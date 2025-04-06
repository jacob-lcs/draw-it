import type { User } from '@supabase/supabase-js'
import { createStore } from 'zustand/vanilla'

export type UserState = {
  baseInfo?: User
}

export type UserActions = {
  setBaseInfo: (baseInfo: User) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setBaseInfo: (baseInfo: User) => {
      set({ baseInfo })
    },
  }))
}
