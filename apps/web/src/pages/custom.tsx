// installed
import { NextPage } from "next";
import groq from "groq";
import { useEffect, useState } from "react";

// shared
import { FloatingInput, FloatingSelect } from "ui";
import { Brand, Car, toBrandList, Category, toCategoryList } from "logic";

// local
import { Title } from "../components";
import { GetStaticProps, getClient, useStore } from '../utils'
import Link from "next/link";


interface CustomPageProps {
  years: number[]
  brands: string[]
}

const CustomPage: NextPage<CustomPageProps> = ({ years, brands }) => {
  const [name, setName] = useState("")
  const store = useStore()

  const setBrand = (value: string) =>
    store?.car.set({ ...store.car.val, brand: value })

  const setYear = (value: number) =>
    store?.car.set({ ...store.car.val, year: value })

  const setVin = (value: string) =>
    store?.car.set({ ...store.car.val, vin: value })

  const setModel = (value: string) =>
    store?.car.set({ ...store.car.val, model: value })


  const addToCart = () => {
    store?.cart.order.set([...store.cart.order.val, { val: { name, car: store.car.val }, count: 1 }])
    setName("")
  }

  useEffect(() => {
    if (store && store.car.val.brand == "") {
      store?.car.set({ ...store.car.val, brand: brands[0] })
    }
  }, [])

  return (
    <div>
      <Title val="Замовити" />

      <div className="container-xl" style={{ minHeight: '64vh' }}>
        <h2 className="mb-3 mt-4">Замовлення автозапчастин</h2>

        {store ?
          <div className="row row-cols-1 row-cols-sm-2 g-3">
            <div className="col">
              <FloatingSelect val={store.car.val.brand} setVal={setBrand} options={brands} label="Марка авто" />
            </div>
            <div className="col">
              <FloatingInput val={store.car.val.model} setVal={setModel} label="Модель" />
            </div>
            <div className="col">
              <FloatingInput val={store.car.val.vin} setVal={setVin} label="VIN код" />
            </div>
            <div className="col">
              <FloatingSelect val={store.car.val.year} setVal={setYear} options={years} label="Рік випуску" />
            </div>
            <div className="col w-100">
              <FloatingInput val={name} setVal={setName} label="Назва деталі" />
            </div>
          </div>
          : null}

        <div className="d-flex justify-content-center gap-3 mt-3 mb-5 pb-4">
          <button className="btn btn-outline-primary btn-lg" onClick={addToCart}>Додати в кошик</button>
          <Link href={`/order?product=${name}`}>
            <div className="btn btn-primary btn-lg shadow-none">
              Замовити
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}

const getStaticProps: GetStaticProps = async ({ preview = false }) => {
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
export { getStaticProps }