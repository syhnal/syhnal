import { CartItem, Product } from "logic"
import Image from "next/image"
import { Counter, ListItem } from "ui"
import { urlFor } from "../../../utils/cms/sanity"
import { useStore } from "../../../utils/store/store"

interface StockItemProps {
  count: number
  product: Product
}

const StockItem = ({ count, product }: StockItemProps) => {
  const store = useStore()

  const remove = () => {
    if (store) store.cart.stock.set(store.cart.stock.val
      .filter(id => id.val != product.id))
  }

  const setCount = (value: number) => {
    if (store) store.cart.stock.set(store.cart.stock.val
      .map(item => item.val == product.id ? { val: item.val, count: value } : item))
  }

  return (
    <ListItem header={product.title.ua} headerSize={6}>
      <div className="row align-items-center g-0">
        <div className="col d-flex justify-content-start justify-content-md-around">
          <Counter count={count} setCount={setCount} />
        </div>

        <div className="col">
          <div style={{ fontWeight: 500 }}>
            від {product.price.from * count} грн
          </div>
        </div>

        <div className="col-auto">
          <i className="bi bi-x-lg py-3 ps-1 ps-sm-3" style={{ cursor: "pointer" }}
            onClick={remove} />
        </div>
      </div>
    </ListItem>
  )
}

export { StockItem }