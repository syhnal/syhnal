import { CartItem, OrderProduct, Product } from "logic"
import Image from "next/image"
import { urlFor } from "../../../utils/cms/sanity"
import { useStore } from "../../../utils/store"

interface OrderItemProps {
  product: CartItem<OrderProduct>
}

const OrderItem = ({ product }: OrderItemProps) => {
  const store = useStore()

  const increment = (name: string) => {
    if (store) store.cart.order.set(store.cart.order.val.map(item =>
      item.val.name == name ? { val: item.val, count: item.count + 1 } : item))
  }

  const decrement = (name: string) => {
    if (store) store.cart.order.set(store.cart.order.val.map(item =>
      item.val.name == name && item.count > 1 ? { val: item.val, count: item.count - 1 } : item))
  }

  const remove = (name: string) => {
    if (store) store.cart.order.set(store.cart.order.val.filter(item => item.val.name != name))
  }


  return (
    <div className="row align-items-center">
      <div className="col d-flex align-items-center">
        <h6 className="m-0">{product.val.name}</h6>
      </div>

      <div className="col-4">
        <div className="d-flex justify-content-center  align-items-center">
          <i className={`bi bi-dash-lg fs-4 px-2 ${product.count == 1 ? "text-muted" : null}`}
            style={{ cursor: "pointer" }}
            onClick={() => decrement(product.val.name)} />
          <span className="user-select-none" style={{ fontWeight: 500 }}>
            {product.count}
          </span>
          <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
            onClick={() => increment(product.val.name)} />
        </div>
      </div>

      <div className="col-auto d-flex justify-content-between ">
        <i className="bi bi-x-lg py-3 ps-3" style={{ cursor: "pointer" }}
          onClick={() => remove(product.val.name)} />
      </div>
    </div>)
}

export { OrderItem }