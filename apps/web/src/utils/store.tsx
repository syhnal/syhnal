import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";

interface IStoreContext {
  cart: {
    val: string[]
    set: Dispatch<SetStateAction<string[]>>
  }
  viewed: {
    val: string[]
    set: Dispatch<SetStateAction<string[]>>
  }
}

const StoreContext = createContext<IStoreContext | null>(null)

const StoreProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<string[]>([])
  const [viewed, setViewed] = useState<string[]>([])

  return (
    <StoreContext.Provider
      value={{
        cart: {
          val: cart,
          set: setCart
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