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
    if (store && !store.cart.val.includes(item.id)) {
      store.cart.set([...store.cart.val, item.id])
    }
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
      {items.map(item => {
        const inCart = store?.cart.val.includes(item.id)

        return (
          <div className="col" key={item.id}>
            <Card
              img={urlFor(item.img).url()}
              header={`${item.price.from} - ${item.price.to} грн`}
              content={item.title.ua}

              onBtnClick={() => toCart(item)}
              btnLabel={inCart ? "Додано" : "В кошик"}
              btnColor={inCart ? "success" : "primary"}
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