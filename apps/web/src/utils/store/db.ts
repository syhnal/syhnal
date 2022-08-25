// Actualy localStorage

import { CartItem, OrderProduct } from "logic"

export interface CartDb {
  stock: CartItem<string>[]
  order: CartItem<OrderProduct>[]
}

const loadDb = (): CartDb | undefined => {
  const storageStr = localStorage.getItem("syhnal")
  if (storageStr) {
    const storageJson = JSON.parse(storageStr)

    return {
      stock: storageJson.cart.stock,
      order: storageJson.cart.order
    }
  }
  return
}

const updateDb = (cart: CartDb) => {
  localStorage.setItem("syhnal", JSON.stringify(cart))
}

export { loadDb, updateDb }