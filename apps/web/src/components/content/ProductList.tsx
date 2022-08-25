import { Product } from "logic"
import Link from "next/link"
import { MouseEventHandler } from "react"
import { ListItem } from "ui"
import { urlFor } from "../../utils/cms/sanity"
import { useStore } from "../../utils/store/store"

interface IProductListProps {
  items: Product[]
}

const ProductList = ({ items }: IProductListProps) => {
  const store = useStore()

  const toCart = (item: Product) => {
    if (store && !store.cart.stock.val.some(some => some.val == item.id)) {
      store.cart.stock.set([...store.cart.stock.val, { val: item.id, count: 1 }])
    }
  }

  return (
    <div className="list-group list-group-flush">
      {items.map(item => {
        const inCart = store?.cart.stock.val.some(some => some.val == item.id)

        return (
          <ListItem header={item.title.ua} key={item.id}>
            <div className="d-flex justify-content-end gap-4 align-items-center">
              <div className="fs-5 fw-semibold me-3">Від {item.price.from} грн</div>
              <Link href={`/order/${item.slug}`}>
                <button className="btn btn-sm btn-main shadow-none">Замовити в 1 клік</button>
              </Link>
              <button className={`btn btn-sm ${inCart ? "btn-green" : "btn-outline"} shadow-none`}
                onClick={() => toCart(item)}>
                {inCart ? "Додано" : "В кошик"}
              </button>
            </div>
          </ListItem>
        )
      })}
    </div>
  )
}

export { ProductList }