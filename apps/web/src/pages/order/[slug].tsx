// installed
import groq from "groq"
import { GetStaticPaths, NextPage } from "next"
import { useState } from "react"

// shared
import { Product, tgSendMessage, toCategoryList, Category, toProduct } from "logic"

// local
import { tgConfig, getClient, urlFor, GetStaticProps } from '../../utils'
import { Person, Title } from "../../components"
import { Counter, ListItem } from "ui"


interface OrderPageProps {
  product: Product
}

const OrderPage: NextPage<OrderPageProps> = ({ product }) => {
  const [count, setCount] = useState(1)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("+380")

  const order = () => {
    const trim = {
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim()
    }

    if (trim.name != "" && trim.surname != "") {
      const text = `
${surname} ${name} бажає замовити:
${product.title.ua}
кількість: ${count} ${count > 1 ? `\nкожен від ${product.price.from} до ${product.price.to} грн` : ""}
всього від ${product.price.from * count} до ${product.price.to * count} грн
Телефон: ${phone}
`

      tgSendMessage(text, tgConfig)
    } else {
      alert("Усі поля моють бути заповненими")
    }
  }

  return (
    <div>
      <Title val="Замовити в 1 клік" />

      <div className="container-xl" style={{ minHeight: "68vh" }}>
        <h2>Замовити в один клік</h2>
        <ListItem header={product.title.ua}>
          <div className="row align-items-center">

            <div className="col-3">
              <Counter count={count} setCount={setCount} />
              <div className="d-flex justify-content-center  align-items-center">
                <i className={`bi bi-dash-lg fs-4 px-2 ${count == 1 ? "text-muted" : null}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => { if (count > 1) setCount(count - 1) }} />
                <div className="user-select-none" style={{ fontWeight: 500 }}>
                  {count}
                </div>
                <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
                  onClick={() => setCount(count + 1)} />
              </div>
            </div>

            <div className="col-3 d-flex justify-content-end align-items-center">
              <div style={{ fontWeight: 500 }}>
                від {product.price.from * count} грн
              </div>
            </div>

          </div>
        </ListItem>

        <div className="mt-5">
          <Person name={{ val: name, set: setName }}
            surname={{ val: surname, set: setSurname }}
            phone={{ val: phone, set: setPhone }} />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary btn-lg" onClick={order}>Замовити</button>
        </div>
      </div>
    </div>
  )
}


const getStaticPaths: GetStaticPaths = async () => {
  const products = await getClient(false) // preview = false
    .fetch(groq`*[_type == 'product']{slug}`)

  const paths = products.map((product: any) => ({
    params: { slug: product.slug.current }
  }))
  return {
    paths,
    fallback: "blocking"
  }
}

const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const client = getClient(preview)

  const product = await client
    .fetch(groq`*[_type == 'product' && slug.current == '${params?.slug}'][0]{..., brand->}`)
    .then<Product>(data => toProduct(data))

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      product,
      categories
    },
    revalidate: 10
  }
}

export default OrderPage
export { getStaticPaths, getStaticProps }