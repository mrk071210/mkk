import { Commit } from 'vuex'
import service from "@/utils/https"

import * as types from '../mutation-types'
import { ActionContextBasic,CheckoutStatus } from '../index'
import { User } from '../types'

export interface State {
  user: User
}
const initState = {
    user:{}
}

// getters
const getters = {
  user: (state: State) => state.user,
}

// actions
const actions = {
    setUser(context:ActionContextBasic,data:User){
    
                context.commit(types.SAVE_USER, data)

    
    }
}

// mutations
const mutations = {
    [types.SAVE_USER](state: State, user: User) {
        state.user = user
      }
}
export default {
  state: initState,
  getters,
  actions,
  mutations,
}