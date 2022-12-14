import { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import groq from "groq";
import { FloatingInput, FloatingSelect } from "ui";
import { Brand, toBrandList, toLang } from "logic";
import { Title } from "../components";
import { getClient, useStore, GetStaticProps, ILangPack } from '../utils'

interface CustomPageProps {
  years: number[]
  brands: string[]
  langPack: ILangPack
}

const CustomPage: NextPage<CustomPageProps> = ({ langPack, years, brands }) => {
  const [name, setName] = useState("")
  const store = useStore()
  const router = useRouter()

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

  const isValid = name.trim() != "" && store?.car.val.model.trim() != ""
    && store?.car.val.vin.trim() != ""

  const order = () => {
    if (isValid) {
      router.push(`/order?product=${name}`)
    }
  }

  useEffect(() => {
    if (store && store.car.val.brand == "") {
      store?.car.set({ ...store.car.val, brand: brands[0] })
    }
  }, [store, brands])

  return (
    <div>
      <Title val="Замовити" />

      <div className="container-xl" style={{ minHeight: '64vh' }}>
        <h2 className="mb-3 mt-4">{langPack.custom.header}</h2>

        {store ?
          <div className="row row-cols-1 row-cols-sm-2 g-3">
            <div className="col">
              <FloatingSelect val={store.car.val.brand} setVal={setBrand}
                options={brands} label="Марка авто" />
            </div>
            <div className="col">
              <FloatingInput val={store.car.val.model} setVal={setModel} label="Модель" />
            </div>
            <div className="col">
              <FloatingInput val={store.car.val.vin} setVal={setVin} label="VIN код" />
            </div>
            <div className="col">
              <FloatingSelect val={store.car.val.year} setVal={setYear}
                options={years} label={langPack.custom.year} />
            </div>
            <div className="col w-100">
              <FloatingInput val={name} setVal={setName} label={langPack.custom.name} />
            </div>
          </div>
          : null}

        <div className="d-flex justify-content-center gap-3 mt-3 mb-5 pb-4">
          <button className="btn btn-outline btn-lg"
            onClick={addToCart} disabled={!isValid}>{langPack.custom.cart}</button>
          <button className="btn btn-dark-blue btn-lg shadow-none"
            onClick={order} disabled={!isValid}>{langPack.custom.order}</button>
        </div>

      </div>
    </div>
  )
}

const getStaticProps: GetStaticProps = async ({ locale = 'uk', preview = false }) => {
  const client = getClient(preview)
  const lang = toLang(locale);

  const brands = await client
    .fetch(groq`*[_type == 'brand']`)
    .then<Brand[]>(toBrandList).then(brands => brands.map(brand => brand.title))

  const current = (new Date()).getFullYear()
  const years = [...Array(200).keys()].map(num => current - num)

  return {
    props: {
      langPack: {
        navigation: require(`../langs/navigation/${lang}.json`),
        custom: require(`../langs/custom/${lang}.json`)
      },
      years,
      brands
    },
    revalidate: 10,
  }
}

export default CustomPage
export { getStaticProps }