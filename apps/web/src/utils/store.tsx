import { Car, CartItem, OrderProduct, Product } from "logic";
import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { StateProp } from "./types";

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
  viewed: StateProp<Product[]>
}

const StoreContext = createContext<IStoreContext | null>(null)

const StoreProvider: FC = ({ children }) => {
  const [stockCart, setStockCart] = useState<CartItem<string>[]>([])
  const [orderCart, setOrderCart] = useState<CartItem<OrderProduct>[]>([])
  const [viewed, setViewed] = useState<Product[]>([])
  const [car, setCar] = useState<Car>({
    brand: "", model: "", vin: "", year: 2022
  })

  const [start, setStart] = useState<string>("")
  const [brand, setBrand] = useState<string>("")


  return (
    <StoreContext.Provider
      value={{
        cart: {
          stock: {
            val: stockCart,
            set: setStockCart
          },
          order: {
            val: orderCart,
            set: setOrderCart
          }
        },
        search: {
          start: {
            val: start,
            set: setStart
          },
          brand: {
            val: brand,
            set: setBrand
          }
        },
        car: {
          val: car,
          set: setCar
        },
        viewed: {
          val: viewed,
          set: setViewed
        }
      }}
    >
      {children}
    </StoreContext.Provider >
  )
}

const useStoreContext = () => useContext(StoreContext)

export { StoreProvider, useStoreContext }