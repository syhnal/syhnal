import { CartItem, OrderProduct } from "logic"
import { Counter, ListItem } from "ui"
import { useStore } from "../../../utils"

interface OrderItemProps {
  product: CartItem<OrderProduct>
}

const OrderItem = ({ product }: OrderItemProps) => {
  const store = useStore()

  const remove = () => {
    if (store) store.cart.order.set(store.cart.order.val.filter(item => item.val.name != product.val.name))
  }

  const setCount = (value: number) => {
    if (store) store.cart.order.set(store.cart.order.val.map(item =>
      item.val.name == product.val.name ? { val: item.val, count: value } : item))
  }

  return (
    <ListItem header={product.val.name}>
      <div className="row align-items-center g-0">

        <div className="col d-flex justify-content-start justify-content-md-around">
          <Counter count={product.count} setCount={setCount} />
        </div>

        <div className="col-auto">
          <i className="bi bi-x-lg py-3 ps-3" style={{ cursor: "pointer" }}
            onClick={remove} />
        </div>
      </div>
    </ListItem>
  )
}

export { OrderItem }