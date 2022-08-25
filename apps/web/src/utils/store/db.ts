import { CartItem, OrderProduct } from "logic"

// Actualy localStorage
export interface Db {
  cart: {
    stock: CartItem<string>[]
    order: CartItem<OrderProduct>[]
  }
}

const loadDb = (): Db | undefined => {
  const storageStr = localStorage.getItem("syhnal")
  if (storageStr) {
    const storageJson = JSON.parse(storageStr)
    console.log(storageJson)
    return {
      cart: {
        stock: storageJson.cart.stock,
        order: storageJson.cart.order
      }
    }
  }
  return
}

const updateDb = (cart: Db) => {
  localStorage.setItem("syhnal", JSON.stringify(cart))
}

export { loadDb, updateDb }