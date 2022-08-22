import { NextPage } from "next";
import { FloatingInput, FloatingSelect } from "ui";
import { NavBar, Title } from "../components";
import { GetStaticProps } from '../utils'
import { getClient } from "../utils/cms/sanity.server";
import groq from "groq";
import { Brand, Car, toBrandList, Category, toCategoryList } from "logic";
import { useState } from "react";
import { useStoreContext } from "../utils/store";

interface CustomPageProps {
  years: number[]
  brands: string[]
}

const CustomPage: NextPage<CustomPageProps> = ({ years, brands }) => {
  const [model, setModel] = useState("")
  const [vin, setVin] = useState("")
  const [name, setName] = useState("")
  const [brand, setBrand] = useState(brands[0])
  const [year, setYear] = useState(years[0])

  const store = useStoreContext()
  const addToCart = () => {
    const car: Car = { model, vin, brand, year }
    store?.cart.order.set([...store.cart.order.val, { val: { name, car }, count: 1 }])
    setName("")
  }

  return (
    <div>
      <Title val="Замовити" />

      <div className="container-xl" style={{ minHeight: '67vh' }}>
        <h2 className="mb-3 mt-4">Замовлення автозапчастин</h2>

        <div className="row row-cols-1 row-cols-sm-2 g-3">
          <div className="col">
            <FloatingSelect val={brand} setVal={setBrand} options={brands} label="Марка авто" id="brand" />
          </div>
          <div className="col">
            <FloatingInput val={model} setVal={setModel} label="Модель" />
          </div>
          <div className="col">
            <FloatingInput val={vin} setVal={setVin} label="VIN код" />
          </div>
          <div className="col">
            <FloatingSelect val={year} setVal={setYear} options={years} label="Рік випуску" id="year" />
          </div>
          <div className="col w-100">
            <FloatingInput val={name} setVal={setName} label="Назва деталі" />
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-3 mb-5 pb-4">
          <button className="btn btn-outline-primary btn-lg" onClick={addToCart}>Додати в кошик</button>
          <button className="btn btn-primary btn-lg">Замовити</button>
        </div>

      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const brands = await client
    .fetch(groq`*[_type == 'brand']`)
    .then<Brand[]>(toBrandList).then(brands => brands.map(brand => brand.title))

  const current = (new Date()).getFullYear()
  const years = [...Array(200).keys()].map(num => current - num)

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      years,
      brands,
      categories
    },
    revalidate: 10,
  }
}

export default CustomPage