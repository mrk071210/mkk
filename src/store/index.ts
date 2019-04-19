import Vue from 'vue'
import Vuex, {  Commit, Dispatch } from 'vuex'
import actions from './actions'
import getters from './getters'
import user, { State as UserState } from './modules/user'
import products, { State as ProductsState } from './modules/products'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
      user,
      products,
    },
    plugins:[
        createPersistedState({
            storage: window.localStorage,
            reducer(val:any) {
                return {
                // 只储存state中的user
                user: val.user
              }
           }
        })
    ]
  })
  
  export interface ActionContextBasic {
    commit: Commit,
    dispatch: Dispatch
  }
  export interface Product {
    id: number,
    title: string,
    price: number,
    inventory: number
  }
  export interface State {
    user: UserState,
    products: ProductsState
  }
  
  export type CheckoutStatus = 'successful' | 'failed' | null