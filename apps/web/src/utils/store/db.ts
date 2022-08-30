import { CartItem, OrderProduct } from "logic"

// Actualy localStorage
export interface Db {
  cart: {
    stock: CartItem<string>[]
    order: CartItem<OrderProduct>[]
  }
}

const loadDb = (): Db | undefined => {
  const storageStr = localStorage.getItem("signal")
  if (storageStr) {
    const storageJson = JSON.parse(storageStr)
    return {
      cart: {
        stock: storageJson.cart.stock,
        order: storageJson.cart.order
      }
    }
  }
}

const updateDb = (cart: Db) => {
  localStorage.setItem("signal", JSON.stringify(cart))
}

export { loadDb, updateDb }