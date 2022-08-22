import groq from "groq";
import { Product, Category, toCategoryList, toProductList } from "logic";
import { GetStaticProps, NextPage } from "next";
import { NavBar, Title } from "../../components";
import { ProductList } from "../../components/content/ProductList";
import { getClient } from "../../utils/cms/sanity.server";

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