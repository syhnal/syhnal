// installed
import groq from "groq";
import { NextPage } from "next";

// shared
import { Product, Category, toCategoryList, toProductList, Brand, toBrandList, uniqueBrand } from "logic";

// local
import { getClient, GetStaticProps, useStoreContext } from '../../utils'
import { NoInStock, ProductList, Title } from "../../components";


interface CatalogProps {
  products: Product[]
  brands: Brand[]
}

const CatalogPage: NextPage<CatalogProps> = ({ products, brands }) => {
  const store = useStoreContext()
  const start = store ? store.search.start.val.toLowerCase() : ""

  const selectBrand = (value: string) => {
    if (store) store.search.brand.set(value)
  }

  const productList = products
    .filter(product =>
      product.title.ua.toLowerCase().startsWith(start) && store &&
      product.brand.title.startsWith(store.search.brand.val)
    )

  return (
    <div>
      <Title val="Каталог" />

      <div className="container-xl">
        <div className="d-flex justify-content-between my-4 align-items-center">
          <h2 className="">Каталог</h2>
          <div >
            <select className="form-select form-select-lg shadow-none"
              onChange={(e: any) => selectBrand(e.target.value)}
              defaultValue={store?.search.brand.val}
            >
              <option value="">Усі марки авто</option>
              {brands.map(brand =>
                <option key={brand.id} value={brand.title}>{brand.title}</option>
              )}
            </select>
          </div>
        </div>
        {productList.length > 0
          ? <ProductList items={productList} />
          : <div style={{ height: "40vh" }} className="d-flex flex-column justify-content-center">
            <NoInStock />
          </div>
        }
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

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      products,
      brands,
      categories
    },
    revalidate: 10,
  }
}

export default CatalogPage
export { getStaticProps }