import { NextPage } from 'next'
import { useRouter } from "next/router"
import { useState } from "react"
import { toLang, tgSendMessage } from "logic"
import { Counter, ListItem } from "ui"
import { Person, Title } from "../../components"
import { GetStaticProps, ILangPack, tgConfig, useStore } from "../../utils"

interface OrderCustomPageProps {
  langPack: ILangPack
}

const OrderCustomPage: NextPage<OrderCustomPageProps> = ({ langPack }) => {
  const store = useStore()
  const router = useRouter()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")

  const [count, setCount] = useState(1)
  const { product } = router.query

  const isValid = name.trim() != "" && surname.trim() != "" && phone.length == 9

  const order = () => {
    if (store) {
      const text = `
${surname} ${name} бажає замовити:
${product}
Кіл-ть: ${count}
Для авто:
VIN: ${store.car.val.vin}
Модель: ${store.car.val.model}
Марка: ${store.car.val.brand}
Рік: ${store.car.val.year}
Телефон: +380${phone}
`
      tgSendMessage(text, tgConfig)
    }
  }

  return (
    <>
      <Title val="Замовити в один клік" />
      <div className="container-xl" style={{ minHeight: "65vh" }}>
        <h2>{langPack.order.header}</h2>

        {product
          ? <ListItem header={product.toString()}>
            <div className="d-flex justify-content-end">
              <Counter count={count} setCount={setCount} />
            </div>
          </ListItem>
          : null}

        <div className="mt-4">
          <Person name={{ val: name, set: setName }}
            surname={{ val: surname, set: setSurname }}
            phone={{ val: phone, set: setPhone }} />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-dark-blue btn-lg" disabled={!isValid}
            onClick={order}>{langPack.order.order}</button>
        </div>
      </div>
    </>
  )
}

const getStaticProps: GetStaticProps = async ({ locale = 'uk' }) => {
  const lang = toLang(locale)

  return {
    props: {
      langPack: {
        navigation: require(`../../langs/navigation/${lang}.json`),
        person: require(`../../langs/components/Person/${lang}.json`),
        order: require(`../../langs/order/${lang}.json`)
      },
    }
  }
}

export default OrderCustomPage
export { getStaticProps }