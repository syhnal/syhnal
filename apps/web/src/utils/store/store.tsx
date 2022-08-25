import { Car, CartItem, OrderProduct, Product } from "logic";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { StateProp } from "../types";
import { loadDb, updateDb } from "./db";

interface IStoreContext {
  cart: {
    stock: StateProp<CartItem<string>[]>
    order: StateProp<CartItem<OrderProduct>[]>
  }
  car: StateProp<Car>
  search: {
    start: StateProp<string>
    brand: StateProp<string>
  }
}

const StoreContext = createContext<IStoreContext | null>(null)

const StoreProvider: FC = ({ children }) => {
  const [stockCart, setStockCart] = useState<CartItem<string>[]>([])
  const [orderCart, setOrderCart] = useState<CartItem<OrderProduct>[]>([])
  const [car, setCar] = useState<Car>({
    brand: "", model: "", vin: "", year: 2022
  })

  const [start, setStart] = useState<string>("")
  const [brand, setBrand] = useState<string>("")

  useEffect(() => {
    const cart = loadDb()
    if (cart) {
      setStockCart(cart.stock)
      setOrderCart(cart.order)
    }
  }, [])

  useEffect(() => {
    updateDb({
      stock: stockCart,
      order: orderCart
    })
  }, [stockCart, orderCart])

  return (
    <StoreContext.Provider
      value={{
        cart: {
          stock: { val: stockCart, set: setStockCart },
          order: { val: orderCart, set: setOrderCart }
        },
        search: {
          start: { val: start, set: setStart },
          brand: { val: brand, set: setBrand }
        },
        car: { val: car, set: setCar },
      }}
    >
      {children}
    </StoreContext.Provider >
  )
}

const useStore = () => useContext(StoreContext)

export { StoreProvider, useStore }