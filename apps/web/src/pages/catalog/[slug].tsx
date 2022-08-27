// installed
import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import groq from "groq"

// shared
import { Product, Brand, Category, toCategoryList, toProductList, toBrandList, uniqueBrand } from "logic"

// local
import { NoInStock, ProductList, SearchBrand, Title } from "../../components"
import { filterCatalog, getClient, useStore } from "../../utils"
import Link from "next/link"


interface CategoryCatalogProps {
  products: Product[]
  brands: Brand[]
  category: {
    ua: string
    ru: string
  }
}

const CategoryCatalog: NextPage<CategoryCatalogProps> = ({ products, category, brands }) => {
  const productList = filterCatalog(products)

  return (
    <>
      <Title val="Каталог" />

      <div className="container-xl">
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <ol className="breadcrumb text-muted" style={{ fontSize: 13 }}>
              <li className="breadcrumb-item">
                <Link href="/catalog">Каталог</Link>
              </li>
              <li className="breadcrumb-item">{category.ua}</li>
            </ol>
            <h2 className="mb-0">{category.ua}</h2>
          </div>
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
    </>
  )
}


const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getClient(false) // preview = false
    .fetch(groq`*[_type == 'category']`)

  const paths = categories.map((category: any) => ({
    params: {
      slug: category.slug.current,
    },
  }))

  return {
    paths,
    fallback: "blocking"
  }
}


const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  const client = getClient(preview)

  const products = await client
    .fetch(groq`*[_type == 'product' && category->slug.current == '${params?.slug}']{..., brand->}`)
    .then<Product[]>(data => toProductList(data))

  const category = await client
    .fetch(groq`*[_type == 'category' && slug.current == '${params?.slug}'][0]{...title}`)

  const brands: Brand[] = products
    .map(product => product.brand)
    .filter(uniqueBrand)

  return {
    props: {
      products,
      category,
      brands
    },
    revalidate: 10
  }
}

export default CategoryCatalog
export { getStaticPaths, getStaticProps }