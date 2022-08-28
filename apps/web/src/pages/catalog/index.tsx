// installed
import groq from "groq";
import { GetStaticProps, NextPage } from "next";

// shared
import { Product, toProductList, Brand, uniqueBrand } from "logic";

// local
import { getClient, filterCatalog, toLocale } from '../../utils'
import { NoInStock, ProductList, SearchBrand, Title } from "../../components";


interface CatalogProps {
  products: Product[]
  brands: Brand[]
}

const CatalogPage: NextPage<CatalogProps> = ({ products, brands }) => {
  const productList = filterCatalog(products)

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

const getStaticProps: GetStaticProps = async ({ locale = 'uk', preview = false }) => {
  const client = getClient(preview)
  const lang = toLocale(locale)

  const products = await client.fetch(
    groq`*[_type == 'product']{..., brand->}`
  ).then<Product[]>(data => toProductList(data, lang))

  const brands: Brand[] = products
    .map(product => product.brand)
    .filter(uniqueBrand)

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