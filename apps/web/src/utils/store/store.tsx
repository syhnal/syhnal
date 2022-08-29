import {
  Dispatch, SetStateAction, createContext, FC, useContext, useEffect, useState
} from "react";
import { Car, CartItem, OrderProduct, } from "logic";
import { loadDb, updateDb } from "./db";

interface StateProp<T> {
  val: T
  set: Dispatch<SetStateAction<T>>
}

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
const useStore = () => useContext(StoreContext)

const StoreProvider: FC = ({ children }) => {
  const [stock, setStockCart] = useState<CartItem<string>[]>([])
  const [order, setOrderCart] = useState<CartItem<OrderProduct>[]>([])
  const [car, setCar] = useState<Car>({ brand: "", model: "", vin: "", year: 2022 })
  const [start, setStart] = useState<string>("")
  const [brand, setBrand] = useState<string>("")

  useEffect(() => {
    const db = loadDb()
    if (db) {
      setStockCart(db.cart.stock)
      setOrderCart(db.cart.order)
    }
  }, [])

  useEffect(() => {
    updateDb({
      cart: { stock, order }
    })
  }, [stock, order])

  return (
    <StoreContext.Provider
      value={{
        cart: {
          stock: { val: stock, set: setStockCart },
          order: { val: order, set: setOrderCart }
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

export { StoreProvider, useStore }