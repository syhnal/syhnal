import groq from "groq"
import { toProductList, Product } from "logic"
import { NextPage } from "next"
import { GetStaticProps } from 'next'
import Image from "next/image"
import { NavBar, Title } from "../components"
import { urlFor } from "../utils/cms/sanity"
import { getClient } from "../utils/cms/sanity.server"
import { useStoreContext } from "../utils/store"

interface ICartProps {
  products: Product[]
}

const Cart: NextPage<ICartProps> = ({ products }) => {
  const store = useStoreContext()

  return (
    <div>
      <Title val="Корзина" />
      <NavBar />

      <div className="container-xl" style={{ minHeight: "50vh" }}>
        <div>
          <h2>Кошик</h2>
          <ul className="list-group list-group-flush">
            {store?.cart.val.map(id => {
              const product = products.find(item => item.id == id)

              return product ? (
                <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                  <img src={urlFor(product.img).url()} className="card-img-top" alt="" style={{ height: "60px", width: "60px" }} />
                  <h6>{product.title.ua}</h6>
                  <div>
                    - 1 +
                  </div>
                  <span>{product.price.from}-{product.price.to}</span>
                  <i className="bi bi-x-lg" />
                  {/* <Image src={urlFor(product.img).url()} width={50} height={50} /> */}
                </li>
              ) : null
            })}
          </ul>
        </div>

      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const products = await client.fetch(
    groq`*[_type == 'product']`
  ).then<Product[]>(toProductList)

  return {
    props: {
      products,
    },
    revalidate: 10,
  }
}

export default Cart