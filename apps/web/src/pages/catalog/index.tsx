// installed
import groq from "groq";
import { GetStaticProps, NextPage } from "next";

// shared
import { Product, toProductList, Brand, toBrandList, uniqueBrand } from "logic";

// local
import { getClient, useStore } from '../../utils'
import { NoInStock, ProductList, SearchBrand, Title } from "../../components";


interface CatalogProps {
  products: Product[]
  brands: Brand[]
}

const CatalogPage: NextPage<CatalogProps> = ({ products, brands }) => {
  const store = useStore()
  const start = store ? store.search.start.val.toLowerCase() : ""

  const productList = products
    .filter(product =>
      product.title.ua.toLowerCase().startsWith(start) && store &&
      product.brand.title.startsWith(store.search.brand.val)
    )

  return (
    <div>
      <Title val="Каталог" />

      <div className="container-xl">
        <div className="d-flex justify-content-between mt-4 align-items-center">
          <h2 className="mb-0">Каталог</h2>
          <div><SearchBrand brands={brands} /></div>
        </div>

        <div className="mt-4">
          {productList.length > 0
            ? <ProductList items={productList} />
            : <div style={{ height: "40vh" }} className="d-flex flex-column justify-content-center">
              <NoInStock />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const products = await client.fetch(
    groq`*[_type == 'product']{..., brand->}`
  ).then<Product[]>(toProductList)

  const brands = await client
    .fetch(groq`*[_type == 'product']{...brand->}`)
    .then<Brand[]>(toBrandList)
    .then(brands => brands.filter(uniqueBrand))

  return {
    props: {
      products,
      brands
    },
    revalidate: 10,
  }
}

export default CatalogPage
export { getStaticProps }