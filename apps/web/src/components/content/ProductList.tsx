import { Product } from "logic"
import Link from "next/link"
import { MouseEventHandler } from "react"
import { ListItem } from "ui"
import { urlFor } from "../../utils/cms/sanity"
import { useStoreContext } from "../../utils/store"

interface IProductListProps {
  items: Product[]
}

const ProductList = ({ items }: IProductListProps) => {
  const store = useStoreContext()

  const toCart = (item: Product) => {
    if (store && !store.cart.stock.val.some(some => some.val == item.id)) {
      store.cart.stock.set([...store.cart.stock.val, { val: item.id, count: 1 }])
    }
  }

  // const toViewed = (item: Product) => {
  //   if (store && !store.viewed.val.includes(item)) {
  //     store.viewed.set(store.viewed.val.length < 5
  //       ? [item, ...store.viewed.val]
  //       : [item, ...store.viewed.val.slice(0, store.viewed.val.length - 1)])
  //   }
  // }

  return (
    <div className="list-group list-group-flush">
      {items.map(item => {
        const inCart = store?.cart.stock.val.some(some => some.val == item.id)

        return (
          <ListItem header={item.title.ua} key={item.id}>
            <div className="d-flex justify-content-end gap-4 align-items-center">
              <div className="fs-5 fw-semibold me-3">Від {item.price.from} грн</div>
              <Link href={`/order/${item.slug}`}>
                <button className="btn btn-sm btn-primary shadow-none">Замовити в 1 клік</button>
              </Link>
              <button className={`btn btn-sm btn-outline-${inCart ? "success" : "primary"} shadow-none`}
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