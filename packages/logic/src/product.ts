export interface Product {
  id: string
  title: {
    ua: string
    ru: string
  }
  price: {
    from: number
    to: number
  }
  slug: string
  img: any
}

const toProduct = (data: any): Product => {
  console.log(data)
  return {
    id: data._id,
    title: {
      ua: data.title.ua,
      ru: data.title.ru
    },
    price: {
      from: data.price.from,
      to: data.price.to
    },
    slug: data.slug,
    img: data.img
  }
}

export { toProduct }