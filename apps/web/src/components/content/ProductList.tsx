import Link from "next/link"
import { Product } from "logic"
import { ListItem } from "ui"
import { useLangPack } from '../../utils'
import { useStore } from "../../utils/store/store"

interface IProductListProps {
  items: Product[]
}

const ProductList = ({ items }: IProductListProps) => {
  const store = useStore()
  const langPack = useLangPack()

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
          <ListItem header={item.title} key={item.id}>
            <div className="d-flex justify-content-between justify-content-md-end
            gap-1 gap-md-3 gap-lg-4 align-items-center">
              <div className="fs-6 fs-md-5 fw-semibold me-0 me-lg-3">
                {langPack.productList.from} {item.price.from} грн
              </div>
              <Link href={`/order/${item.slug}`}>
                <button className="btn btn-sm btn-main shadow-none">
                  {langPack.productList.order}
                </button>
              </Link>
              <button className={`btn btn-sm ${inCart ? "btn-green" : "btn-outline"} shadow-none`}
                onClick={() => toCart(item)}>
                {inCart ? langPack.productList.added : langPack.productList.cart}
              </button>
            </div>
          </ListItem>
        )
      })}
    </div>
  )
}

export { ProductList }