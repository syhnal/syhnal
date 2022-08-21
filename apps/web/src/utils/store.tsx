import { CartItem, OrderProduct, Product } from "logic";
import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";

interface IStoreContext {
  cart: {
    stock: {
      val: CartItem<string>[]
      set: Dispatch<SetStateAction<CartItem<string>[]>>
    }
    order: {
      val: CartItem<OrderProduct>[]
      set: Dispatch<SetStateAction<CartItem<OrderProduct>[]>>
    }
  }
  viewed: {
    val: Product[]
    set: Dispatch<SetStateAction<Product[]>>
  }
}

const StoreContext = createContext<IStoreContext | null>(null)

const StoreProvider: FC = ({ children }) => {
  const [stockCart, setStockCart] = useState<CartItem<string>[]>([])
  const [orderCart, setOrderCart] = useState<CartItem<OrderProduct>[]>([])
  const [viewed, setViewed] = useState<Product[]>([])

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
        viewed: {
          val: viewed,
          set: setViewed
        }
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStoreContext = () => useContext(StoreContext)

export { StoreProvider, useStoreContext }