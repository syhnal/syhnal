import groq from "groq";
import { NextPage } from "next";
import { Product, toProductList, Brand, toLang, uniqueBrand } from "logic";
import { getClient, useFilterCatalog, GetStaticProps } from '../../utils'
import { NoInStock, ProductList, SearchBrand, Title } from "../../components";

interface CatalogProps {
  products: Product[]
  brands: Brand[]
}

const CatalogPage: NextPage<CatalogProps> = ({ products, brands }) => {
  const productList = useFilterCatalog(products)

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
  const lang = toLang(locale)

  const products = await client.fetch(
    groq`*[_type == 'product']{..., brand->}`
  ).then<Product[]>(data => toProductList(data, lang))

  const brands: Brand[] = products
    .map(product => product.brand)
    .filter(uniqueBrand)

  return {
    props: {
      langPack: {
        navigation: require(`../../langs/navigation/${lang}.json`),
        productList: require(`../../langs/components/ProductList/${lang}.json`),
        catalog: require(`../../langs/catalog/${lang}.json`)
      },
      products,
      brands
    },
    revalidate: 10,
  }
}

export default CatalogPage
export { getStaticProps }