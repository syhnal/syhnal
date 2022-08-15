import { MouseEventHandler } from "react"
import { Card } from "ui"
import { useStoreContext } from "../../utils/store"

interface IProductListProps {
  items: string[]
}

const ProductList = ({ items }: IProductListProps) => {
  const store = useStoreContext()

  const toCart = () => {
    store?.cart.set([...store.cart.val, "tsr"])
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
      {items.map(item =>
        <div className="col">
          <Card
            img='/brands/bmw.png'
            header='12 999 грн'
            content='Акумулятор Bosch 6 CT-60-R S4 Silver 0092S40240'
            onBtnClick={toCart} btnLabel='В кошик'
          />
        </div>
      )}
    </div>
  )
}

export { ProductList }