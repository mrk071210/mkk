
import * as types from '../mutation-types'
import { ActionContextBasic, Product } from '../index'

export interface ProductsPayload {
  products: Product[]
}

export interface State {
  all: Product[]
}

// initial state
const initState = {
  all: [],
}

// getters
const getters = {
  allProducts: (state: State) => state.all,
}

// actions
const actions = {
  getAllProducts(context: ActionContextBasic) {
      context.commit(types.RECEIVE_PRODUCTS, [{
        id: 1,
        title: "string",
        price: 1,
        inventory: 1
      }]
      )
  },
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS](state: State, payload: ProductsPayload) {
    state.all = payload.products
  }
}

export default {
  state: initState,
  getters,
  actions,
  mutations,
}
