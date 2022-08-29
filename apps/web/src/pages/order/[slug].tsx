import groq from "groq"
import { GetStaticPaths, NextPage } from "next"
import { useState } from "react"
import { Product, tgSendMessage, toProduct } from "logic"
import { Counter, ListItem } from "ui"
import { tgConfig, getClient, GetStaticProps, toLang, ILangPack } from '../../utils'
import { Person, Title } from "../../components"


interface OrderPageProps {
  langPack: ILangPack
  product: Product
}

const OrderPage: NextPage<OrderPageProps> = ({ langPack, product }) => {
  const [count, setCount] = useState(1)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")

  const isValid = name.trim() != "" && surname.trim() != "" && phone.length == 9

  const order = () => {
    const text = `
${surname} ${name} бажає замовити:
${product.title}
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
        <h2>{langPack.order.header}</h2>
        <ListItem header={product.title}>
          <div className="row">
            <div className="col d-flex justify-content-end">
              <Counter count={count} setCount={setCount} />
            </div>

            <div className="col d-flex justify-content-end align-items-center">
              <div className="fs-5 fw-semibold">
                {langPack.order.from} {product.price.from * count} грн
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
            onClick={order} disabled={!isValid}>{langPack.order.order}</button>
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

const getStaticProps: GetStaticProps = async ({ locale = 'uk', params, preview = false }) => {
  const client = getClient(preview)
  const lang = toLang(locale)

  const product = await client
    .fetch(groq`*[_type == 'product' && slug.current == '${params?.slug}'][0]{..., brand->}`)
    .then<Product>(data => toProduct(data, lang))

  return {
    props: {
      langPack: {
        navigation: require(`../../langs/navigation/${lang}.json`),
        person: require(`../../langs/components/Person/${lang}.json`),
        order: require(`../../langs/order/${lang}.json`)
      },
      product
    },
    revalidate: 10
  }
}

export default OrderPage
export { getStaticPaths, getStaticProps }