// installed
import groq from "groq"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { useState } from "react"

// shared
import { Product, tgSendMessage, toProduct } from "logic"

// local
import { tgConfig, getClient } from '../../utils'
import { Person, Title } from "../../components"
import { Counter, ListItem } from "ui"


interface OrderPageProps {
  product: Product
}

const OrderPage: NextPage<OrderPageProps> = ({ product }) => {
  const [count, setCount] = useState(1)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")

  const isValid = name.trim() != "" && surname.trim() != "" && phone.length == 9

  const order = () => {
    const text = `
${surname} ${name} бажає замовити:
${product.title.ua}
кількість: ${count} ${count > 1 ? `\nкожен від ${product.price.from} до ${product.price.to} грн` : ""}
всього від ${product.price.from * count} до ${product.price.to * count} грн
Телефон: +380${phone}
`

    tgSendMessage(text, tgConfig)
  }

  return (
    <div>
      <Title val="Замовити в 1 клік" />

      <div className="container-xl" style={{ minHeight: "68vh" }}>
        <h2>Замовити в один клік</h2>
        <ListItem header={product.title.ua}>
          <div className="row">
            <div className="col d-flex justify-content-end">
              <Counter count={count} setCount={setCount} />
            </div>

            <div className="col d-flex justify-content-end align-items-center">
              <div className="fs-5 fw-semibold">
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
          <button className='btn btn-lg btn-dark-blue'
            onClick={order} disabled={!isValid}>Замовити</button>
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

  return {
    props: {
      product
    },
    revalidate: 10
  }
}

export default OrderPage
export { getStaticPaths, getStaticProps }