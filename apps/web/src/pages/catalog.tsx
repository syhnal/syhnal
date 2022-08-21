import groq from "groq";
import { Product, toProductList } from "logic";
import { GetStaticProps, NextPage } from "next";
import { NavBar, Title } from "../components";
import { ProductList } from "../components/content/ProductList";
import { getClient } from "../utils/cms/sanity.server";

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

  return {
    props: {
      products
    },
    revalidate: 10,
  }
}

export default CatalogPage
export { getStaticProps }