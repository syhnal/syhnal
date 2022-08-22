import groq from "groq"
import { toProductList, Product, toCategoryList, Category } from "logic"
import { NextPage } from "next"
import { GetStaticProps } from 'next'
import Image from "next/image"
import { useState } from "react"
import { FloatingInput } from "ui"
import { NavBar, Person, Title } from "../components"
import { urlFor } from "../utils/cms/sanity"
import { getClient } from "../utils/cms/sanity.server"
import { useStoreContext } from "../utils/store"

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

  const removeFromStock = (val: string) => {
    if (store) store.cart.stock.set(store.cart.stock.val.filter(id => id.val != val))
  }

  const removeFromOrder = (name: string) => {
    if (store) store.cart.order.set(store.cart.order.val.filter(product => product.val.name != name))
  }

  const incrementStockItem = (id: string) => {
    if (store) store.cart.stock.set(store.cart.stock.val.map(item =>
      item.val == id ? { val: item.val, count: item.count + 1 } : item))
  }

  const decrementStockItem = (id: string) => {
    if (store) store.cart.stock.set(store.cart.stock.val.map(item =>
      item.val == id && item.count > 1 ? { val: item.val, count: item.count - 1 } : item))
  }

  return (
    <div>
      <Title val="Корзина" />

      <div className="container-xl" style={{ minHeight: "68vh" }}>
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

                      return product ? (
                        <li key={item.val} className="list-group-item px-0">
                          <div className="row align-items-center">
                            <div className="col-6 d-flex align-items-center">
                              <Image src={urlFor(product.img).url()} alt="" width={80} height={80} />
                              <h6 className="m-0 ms-4">{product.title.ua}</h6>
                            </div>

                            <div className="col-3">
                              <div className="d-flex justify-content-center  align-items-center">
                                <i className={`bi bi-dash-lg fs-4 px-2 ${item.count == 1 ? "text-muted" : null}`}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => decrementStockItem(item.val)} />
                                <span className="user-select-none" style={{ fontWeight: 500 }}>
                                  {item.count}
                                </span>
                                <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
                                  onClick={() => incrementStockItem(item.val)} />
                              </div>
                            </div>

                            <div className="col-3 d-flex justify-content-between align-items-center">
                              <span style={{ fontWeight: 500 }}>
                                від {product.price.from * item.count} грн
                              </span>

                              <i className="bi bi-x-lg py-3 ps-3" style={{ cursor: "pointer" }}
                                onClick={() => removeFromStock(item.val)} />
                            </div>
                          </div>
                        </li>
                      ) : null
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
                        <li key={product.val.name} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                          <h6>{product.val.name}</h6>
                          <div>
                            - 1 +
                          </div>
                          <i className="bi bi-x-lg py-3 ps-3" style={{ cursor: "pointer" }}
                            onClick={() => removeFromOrder(product.val.name)} />
                          {/* <Image src={urlFor(product.img).url()} width={50} height={50} /> */}
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
            Ваш кошик досі порожній
          </h2>
        }
      </div>
    </div >
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
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