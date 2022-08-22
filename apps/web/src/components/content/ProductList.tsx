import { Product } from "logic"
import { MouseEventHandler } from "react"
import { Card } from "ui"
import { urlFor } from "../../utils/cms/sanity"
import { useStoreContext } from "../../utils/store"
import { ProductModal } from "./ProductModal"

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

  const toViewed = (item: Product) => {
    if (store && !store.viewed.val.includes(item)) {
      store.viewed.set(store.viewed.val.length < 5
        ? [item, ...store.viewed.val]
        : [item, ...store.viewed.val.slice(0, store.viewed.val.length - 1)])
    }
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
      {items.map(item => {
        const inCart = store?.cart.stock.val.some(some => some.val == item.id)

        return (
          <div className="col" key={item.id}>
            <Card
              img={urlFor(item.img).url()}
              header={`Від ${item.price.from} грн`}
              content={item.title.ua}

              onBtnClick={() => toCart(item)}
              btnLabel={inCart ? "Додано" : "В кошик"}
              btnColor={inCart ? "success" : "primary"}

              onCardClick={() => toViewed(item)}
              dataBsTarget={`#modal-${item.id}`}
              dataBsToggle="modal"
            />
            <ProductModal
              inCart={inCart}
              product={item} id={`modal-${item.id}`}
              toCartClick={() => toCart(item)}
            />
          </div>
        )
      })}
    </div>
  )
}

export { ProductList }