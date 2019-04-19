// 建议dispatch/commit调用，均采用如下形式包裹一层，以启用类型推导

import store, { Product } from './index'


export const dispatchAddToCart = (product: Product) => {
  return store.dispatch('addToCart', product)
}