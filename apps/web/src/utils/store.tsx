import { Car, CartItem, OrderProduct, Product } from "logic";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const storageStr = localStorage.getItem("syhnal")
    if (storageStr) {
      const storageJson = JSON.parse(storageStr)
      console.log(storageJson)
      setStockCart(storageJson.cart.stock)
      setOrderCart(storageJson.cart.order)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("syhnal", JSON.stringify({
      cart: {
        stock: stockCart,
        order: orderCart
      }
    }))
  }, [stockCart, orderCart])


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

const useStore = () => useContext(StoreContext)

export { StoreProvider, useStore }