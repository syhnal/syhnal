// installed
import groq from "groq";
import { NextPage } from "next";

// shared
import { Product, Category, toCategoryList, toProductList } from "logic";

// local
import { getClient, GetStaticProps } from '../../utils'
import { ProductList, Title } from "../../components";


interface CatalogProps {
  products: Product[]
}

const CatalogPage: NextPage<CatalogProps> = ({ products }) => {
  return (
    <div>
      <Title val="Каталог" />

      <div className="container-xl">
        <ProductList items={products} />
      </div>
    </div>
  )
}

const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const products = await client.fetch(
    groq`*[_type == 'product']`
  ).then<Product[]>(toProductList)

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      products,
      categories
    },
    revalidate: 10,
  }
}

export default CatalogPage
export { getStaticProps }