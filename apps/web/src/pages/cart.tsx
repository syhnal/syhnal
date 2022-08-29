import { NextPage } from "next"
import { useState } from "react"
import groq from "groq"
import { toProductList, Product, tgSendMessage } from "logic"
import { useStore, getClient, tgConfig, toLang, GetStaticProps, ILangPack } from '../utils'
import { OrderItem, Person, StockItem, Title } from "../components"

interface CartProps {
  langPack: ILangPack
  products: Product[]
}

const Cart: NextPage<CartProps> = ({ langPack, products }) => {
  const store = useStore()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")

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

  const isValid = name.trim() != "" && surname.trim() != "" && phone.length == 9

  const order = () => {
    const trim = {
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim()
    }

    let text = `${surname} ${name} бажає замовити:\n`

    if (store) {
      if (store.cart.stock.val.length > 0) {
        text += `Товари в наявності:
${store.cart.stock.val.map(item => {
          const product = products.find(product => item.val == product.id)
          const line = product ? `${product.title} кіл-ть: ${item.count}` : ""
          console.log(line)
          return line
        }).join("\n")}
Всьго від ${price()} грн`
      }

      if (store.cart.order.val.length > 0) {
        text += `\nТовари на замовлення:          
${store.cart.order.val.map(item =>
          `--------
${item.val.name} 
Кіл-ть: ${item.count}
Для авто:
VIN: ${item.val.car.vin}
Модель: ${item.val.car.model}
Марка: ${item.val.car.brand}
Рік: ${item.val.car.year}`
        )
          }`
      }
      text += `\n---------\nТелефон: +380${phone}`
      tgSendMessage(text, tgConfig)
    }
  }

  return (
    <div>
      <Title val="Корзина" />

      <div className="container-xl" style={{ minHeight: "65vh" }}>
        {store && (store.cart.order.val.length > 0 || store.cart.stock.val.length > 0)
          ? <div className="row gy-3">
            <div className="col">
              <h2>{langPack.cart.header}</h2>

              {store.cart.stock.val.length > 0 ?
                <div className="mt-3">
                  <h4>{langPack.cart.stock}</h4>
                  <ul className="list-group list-group-flush">
                    {store?.cart.stock.val.map(item => {
                      const product = products.find(data => data.id == item.val)
                      return product ?
                        <StockItem count={item.count} product={product} key={item.val} />
                        : null
                    })}
                  </ul>
                </div>
                : null
              }

              {store.cart.order.val.length > 0 ?
                <div className="mt-3">
                  <h4>{langPack.cart.custom}</h4>
                  <ul className="list-group list-group-flush">
                    {store?.cart.order.val.map(product =>
                      product ?
                        <OrderItem product={product} key={`${product.val.name}-${product.val.car.vin}`} />
                        : null
                    )}
                  </ul>
                </div>
                : null
              }

              <h2 className="mt-4">{langPack.cart.personal}</h2>
              <Person name={{ val: name, set: setName }}
                surname={{ val: surname, set: setSurname }}
                phone={{ val: phone, set: setPhone }} />

            </div>

            <div className="col-md-4 col-lg-3">
              <div className="text-center sticky-md-top">
                <div className="border rounded-3 py-5 px-4" style={{ top: 30 }}>
                  <h3>{langPack.cart.in}</h3>
                  <small className="text-muted">
                    {store?.cart.stock.val.length}{store && store.cart.order.val.length > 0 ?
                      ` + ${store?.cart.order.val.length}` : ""} {langPack.cart.product}
                  </small>
                  <h3 className="fw-bold text-primary my-3">{langPack.cart.from} {price()} грн</h3>
                  <button className="btn btn-dark-blue shadow-none" disabled={!isValid}
                    onClick={order}>{langPack.cart.order}</button>
                </div>
                <div className="px-3">
                  <small className='text-wrap'>
                    {langPack.cart.info}
                    {/* Наш магазин не здійснює<br />доставку та працює лише<br />в м. Умань */}
                  </small>
                </div>
              </div>
            </div>

          </div>
          : <h2 className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
            {langPack.cart.empty}
          </h2>
        }
      </div>
    </div >
  )
}

const getStaticProps: GetStaticProps = async ({ locale = 'uk', preview = false }) => {
  const client = getClient(preview)
  const lang = toLang(locale)

  const products = await client.fetch(
    groq`*[_type == 'product']{..., brand->}`
  ).then<Product[]>(data => toProductList(data, lang))

  return {
    props: {
      langPack: {
        navigation: require(`../langs/navigation/${lang}.json`),
        person: require(`../langs/components/Person/${lang}.json`),
        cart: require(`../langs/cart/${lang}.json`),
      },
      products
    },
    revalidate: 10,
  }
}

export default Cart
export { getStaticProps }