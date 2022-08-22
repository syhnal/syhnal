// installed
import { NextPage } from "next"
import { useState } from "react"
import groq from "groq"

// shared
import { toProductList, Product, toCategoryList, Category } from "logic"

// local
import { useStoreContext, getClient, GetStaticProps } from '../utils'
import { OrderItem, Person, StockItem, Title } from "../components"


interface ICartProps {
  products: Product[]
}

const Cart: NextPage<ICartProps> = ({ products }) => {
  const store = useStoreContext()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("+380")

  const price = (): number => {
    if (store) {
      let sum = 0;
      store.cart.stock.val.forEach(id => {
        const product = products.find(item => item.id == id.val)
        if (product) sum += product?.price.from * id.count
      })
      return sum
    }
    return 0
  }

  return (
    <div>
      <Title val="Корзина" />

      <div className="container-xl" style={{ minHeight: "65vh" }}>
        {store && (store.cart.order.val.length > 0 || store.cart.stock.val.length > 0)
          ? <div className="row">
            <div className="col">
              <h2>Кошик</h2>

              {store.cart.stock.val.length > 0 ?
                <div>
                  <h4>Запчастини в наявності</h4>
                  <ul className="list-group list-group-flush">
                    {store?.cart.stock.val.map(item => {
                      const product = products.find(data => data.id == item.val)

                      return product ?
                        <li key={item.val} className="list-group-item px-0">
                          <StockItem count={item.count} product={product} />
                        </li>
                        : null
                    })}
                  </ul>
                </div>
                : null
              }

              {store.cart.order.val.length > 0 ?
                <div>
                  <h4>Запчастини під замовлення</h4>
                  <ul className="list-group list-group-flush">
                    {store?.cart.order.val.map(product =>
                      product ? (
                        <li key={product.val.name} className="list-group-item px-0">
                          <OrderItem product={product} />
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
                : null
              }

              <h2 className="mt-4">Особисті дані</h2>
              <Person name={{ val: name, set: setName }}
                surname={{ val: surname, set: setSurname }}
                phone={{ val: phone, set: setPhone }} />

            </div>

            <div className="col-md-auto">
              <div className="text-center sticky-md-top">
                <div className="border rounded-3 py-5 px-4" style={{ top: 30 }}>
                  <h3>В кошику</h3>
                  <small className="text-muted">
                    {store?.cart.stock.val.length}{store && store.cart.order.val.length > 0 ? ` + ${store?.cart.order.val.length}` : ""} товари
                  </small>
                  <h3 className="fw-bold text-primary my-3">від {price()} грн</h3>
                  <button className="btn btn-primary">Замовити</button>
                </div>
                <div className="px-3">
                  <small>
                    Наш магазин не здійснює<br />доставку та працює лише<br />в м. Умань
                  </small>
                </div>
              </div>
            </div>

          </div>
          : <h2 className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            Ваш кошик порожній
          </h2>
        }
      </div>
    </div >
  )
}

const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const products = await client.fetch(
    groq`*[_type == 'product']`
  ).then<Product[]>(toProductList)

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      products,
      categories
    },
    revalidate: 10,
  }
}

export default Cart
export { getStaticProps }