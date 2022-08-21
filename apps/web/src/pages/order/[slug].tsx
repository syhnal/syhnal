import groq from "groq"
import { Product, toProduct } from "logic"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useState } from "react"
import { NavBar, Person, Title } from "../../components"
import { urlFor } from "../../utils/cms/sanity"
import { getClient } from "../../utils/cms/sanity.server"

interface OrderPageProps {
  product: Product
}

const OrderPage: NextPage<OrderPageProps> = ({ product }) => {
  const [count, setCount] = useState(1)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("+380")

  return (
    <div>
      <Title val="Замовити в 1 клік" />

      <div className="container-xl" style={{ minHeight: "68vh" }}>
        <h2>Замовити в один клік</h2>
        <div className="row align-items-center">
          <div className="col-6 d-flex align-items-center">
            <Image src={urlFor(product.img).url()} alt="" width={80} height={80} />
            <h6 className="m-0 ms-4">{product.title.ua}</h6>
          </div>

          <div className="col-3">
            <div className="d-flex justify-content-center  align-items-center">
              <i className={`bi bi-dash-lg fs-4 px-2 ${count == 1 ? "text-muted" : null}`}
                style={{ cursor: "pointer" }}
                onClick={() => { if (count > 1) setCount(count - 1) }} />
              <span className="user-select-none" style={{ fontWeight: 500 }}>
                {count}
              </span>
              <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
                onClick={() => setCount(count + 1)} />
            </div>
          </div>

          <div className="col-3 d-flex justify-content-end align-items-center">
            <span style={{ fontWeight: 500 }}>
              від {product.price.from * count} грн
            </span>
          </div>
        </div>

        <div className="mt-5">
          <Person name={{ val: name, set: setName }}
            surname={{ val: surname, set: setSurname }}
            phone={{ val: phone, set: setPhone }} />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary btn-lg">Замовити</button>
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
  const product = await getClient(preview)
    .fetch(groq`*[_type == 'product' && slug.current == '${params?.slug}'][0]`)
    .then<Product>(data => toProduct(data))

  return {
    props: { product },
    revalidate: 10
  }
}

export default OrderPage
export { getStaticPaths, getStaticProps }