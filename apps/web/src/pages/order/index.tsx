// installed
import groq from "groq"
import { useRouter } from "next/router"
import { useState } from "react"

// shared
import { toCategoryList, Category, tgSendMessage } from "logic"

// local
import { Person, Title } from "../../components"
import { getClient, GetStaticProps, tgConfig, useStore } from "../../utils"
import { Counter, ListItem } from "ui"

const OrderCustomPage = () => {
  const store = useStore()
  const router = useRouter()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("+380")

  const [count, setCount] = useState(1)
  const { product } = router.query

  const order = () => {
    const trim = {
      name: name.trim(),
      surname: surname.trim()
    }

    if (phone.length < 13) {
      alert("Будь ласка, перевірте номер телефону. Кількість цифр не є правильною.")
      return
    }

    if (trim.name == "" || trim.surname == "") {
      alert("Будь ласка, заповніть усі поля.")
      return
    }

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
Телефон: ${phone}
`
      tgSendMessage(text, tgConfig)
    }
  }

  return (
    <>
      <Title val="Замовити в один клік" />
      <div className="container-xl" style={{ minHeight: "65vh" }}>
        <h2>Замовити в один клік</h2>

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
          <button className="btn btn-primary btn-lg" onClick={order}>Замовити</button>
        </div>
      </div>
    </>
  )
}

const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const client = getClient(preview)

  const categories = await client
    .fetch(groq`*[_type == 'category']`)
    .then<Category[]>(toCategoryList)

  return {
    props: {
      categories
    },
    revalidate: 10
  }
}

export default OrderCustomPage
export { getStaticProps }