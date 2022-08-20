import { NextPage } from "next";
import { FloatingInput, FloatingSelect } from "ui";
import { NavBar, Title } from "../components";
import { GetStaticProps } from "next";
import { getClient } from "../utils/cms/sanity.server";
import groq from "groq";
import { Brand, toBrandList } from "logic";
import { useState } from "react";

interface OrderPageProps {
  years: number[]
  brands: string[]
}

const OrderPage: NextPage<OrderPageProps> = ({ years, brands }) => {
  const [model, setModel] = useState("")
  const [vin, setVin] = useState("")
  const [name, setName] = useState("")
  const [brand, setBrand] = useState(brands[0])
  const [year, setYear] = useState(years[0])

  return (
    <div>
      <Title val="Замовити" />
      <NavBar />

      <div className="container-xl" style={{ minHeight: '50vh' }}>
        <h2 className="mb-3 mt-4">Замовлення автозапчастин</h2>

        <div className="row row-cols-1 row-cols-sm-2 g-3">
          <div className="col">
            <FloatingSelect val={brand} setVal={setBrand} options={brands} label="Марка авто" id="brand" />
          </div>
          <div className="col">
            <FloatingInput val={model} setVal={setModel} label="Модель" id="model" />
          </div>
          <div className="col">
            <FloatingInput val={vin} setVal={setVin} label="VIN код" id="vin" />
          </div>
          <div className="col">
            <FloatingSelect val={year} setVal={setYear} options={years} label="Рік випуску" id="year" />
          </div>
          <div className="col w-100">
            <FloatingInput val={name} setVal={setName} label="Назва деталі" id="name" />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-3 mb-5 pb-4">
          <button className="btn btn-outline-primary btn-lg">Додати в кошик</button>
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

  return {
    props: {
      years,
      brands
    },
    revalidate: 10,
  }
}

export default OrderPage