// installed
import { GetStaticPaths, NextPage } from "next"
import groq from "groq"

// shared
import { Product, Category, toCategoryList, toProductList } from "logic"

// local
import { ProductList, Title } from "../../components"
import { getClient, GetStaticProps } from "../../utils"


interface CategoryCatalogProps {
  products: Product[]
  category: {
    ua: string
    ru: string
  }
}

const CategoryCatalog: NextPage<CategoryCatalogProps> = ({ products, category }) => {
  return (
    <>
      <Title val="Каталог" />

      <div className="container-xl">
        <ol className="breadcrumb text-muted" style={{ fontSize: 13 }}>
          <li className="breadcrumb-item">Каталог</li>
          <li className="breadcrumb-item">{category.ua}</li>
        </ol>
        <h2>{category.ua}</h2>
        <ProductList items={products} />
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

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      products,
      category,
      categories
    },
    revalidate: 10
  }
}

export default CategoryCatalog
export { getStaticPaths, getStaticProps }