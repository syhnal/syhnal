// installed
import groq from "groq"
import { useRouter } from "next/router"
import { useState } from "react"

// shared
import { toCategoryList, Category, tgSendMessage } from "logic"

// local
import { Person, Title } from "../../components"
import { getClient, GetStaticProps, tgConfig, useStoreContext } from "../../utils"

const OrderCustomPage = () => {
  const store = useStoreContext()
  const router = useRouter()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("+380")

  const [count, setCount] = useState(1)
  const { product } = router.query

  const order = () => {
    const trim = {
      name: name.trim(),
      surname: surname.trim(),
      phone: phone.trim()
    }

    if (trim.name != "" && trim.surname != "" && store) {
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
    } else {
      alert("Усі поля моють бути заповненими")
    }
  }

  return (
    <>
      <Title val="Замовити в один клік" />
      <div className="container-xl" style={{ minHeight: "65vh" }}>
        <h2>Замовити в один клік</h2>
        <div className="row align-items-center mt-3">
          <div className="col d-flex align-items-center">
            <h6 className="m-0">{product}</h6>
          </div>

          <div className="col-3">
            <div className="d-flex justify-content-end align-items-center">
              <i className={`bi bi-dash-lg fs-4 px-2 ${count == 1 ? "text-muted" : null}`}
                style={{ cursor: "pointer" }}
                onClick={() => { if (count > 1) setCount(count - 1) }} />
              <span className="user-select-none" style={{ fontWeight: 500 }}>
                {count}
              </span>
              <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
                onClick={() => setCount(count + 1)} />
            </div>
          </div>
        </div>

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