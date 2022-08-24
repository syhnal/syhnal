import { CartItem, Product } from "logic"
import Image from "next/image"
import { ListItem } from "ui"
import { urlFor } from "../../../utils/cms/sanity"
import { useStoreContext } from "../../../utils/store"

interface StockItemProps {
  count: number
  product: Product
}

const StockItem = ({ count, product }: StockItemProps) => {
  const store = useStoreContext()

  const increment = (id: string) => {
    if (store) store.cart.stock.set(store.cart.stock.val.map(item =>
      item.val == id ? { val: item.val, count: item.count + 1 } : item))
  }

  const decrement = (id: string) => {
    if (store) store.cart.stock.set(store.cart.stock.val.map(item =>
      item.val == id && item.count > 1 ? { val: item.val, count: item.count - 1 } : item))
  }

  const remove = (val: string) => {
    if (store) store.cart.stock.set(store.cart.stock.val.filter(id => id.val != val))
  }


  return (
    <ListItem header={product.title.ua} headerSize={6}>
      <div className="d-flex justify-content-end gap-5 align-items-center">
        <div className="d-flex justify-content-center  align-items-center">
          <i className={`bi bi-dash-lg fs-4 px-2 ${count == 1 ? "text-muted" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => decrement(product.id)} />
          <div className="user-select-none" style={{ fontWeight: 500 }}>
            {count}
          </div>
          <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
            onClick={() => increment(product.id)} />
        </div>
        <div className="d-flex justify-content-between align-items-center gap-5">
          <div style={{ fontWeight: 500 }}>
            від {product.price.from * count} грн
          </div>

          <i className="bi bi-x-lg py-3 ps-3" style={{ cursor: "pointer" }}
            onClick={() => remove(product.id)} />
        </div>
      </div>
    </ListItem>
    // <div className="row align-items-center">
    //   <div className="col-6 d-flex align-items-center">
    //     <h6 className="m-0 ms-4">{product.title.ua}</h6>
    //   </div>

    //   <div className="col-3">
    //     <div className="d-flex justify-content-center  align-items-center">
    //       <i className={`bi bi-dash-lg fs-4 px-2 ${count == 1 ? "text-muted" : null}`}
    //         style={{ cursor: "pointer" }}
    //         onClick={() => decrement(product.id)} />
    //       <span className="user-select-none" style={{ fontWeight: 500 }}>
    //         {count}
    //       </span>
    //       <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
    //         onClick={() => increment(product.id)} />
    //     </div>
    //   </div>

    //   <div className="col-3 d-flex justify-content-between align-items-center">
    //     <span style={{ fontWeight: 500 }}>
    //       від {product.price.from * count} грн
    //     </span>

    //     <i className="bi bi-x-lg py-3 ps-3" style={{ cursor: "pointer" }}
    //       onClick={() => remove(product.id)} />
    //   </div>
    // </div>
  )
}

export { StockItem }