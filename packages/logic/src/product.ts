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

// const compareByTime(a: Product, b: Product):boolean => 

/*
{
    "_createdAt": "2022-08-12T18:20:29Z",
    "_id": "8118bc07-79e5-4634-96c6-6c6be7467c30",
    "_rev": "Pg04jLvOaH8JnYs7Hqb2ou",
    "_type": "product",
    "_updatedAt": "2022-08-15T14:14:23Z",
    "category": {
        "_ref": "9a49e187-cd10-4205-ba8c-2a1ed22c1a8b",
        "_type": "reference",
        "_weak": true
    },
    "img": {
        "_type": "image",
        "asset": {
            "_ref": "image-918f6bc71e78b8c3fd6148914398a970d1bcd01c-512x512-png",
            "_type": "reference"
        }
    },
    "price": {
        "from": 321,
        "to": 321
    },
    "slug": {
        "_type": "slug",
        "current": "akumulyator"
    },
    "title": {
        "ru": "Акумуляторр",
        "ua": "Акумулятор"
    }
}
*/

const toProduct = (data: any): Product => {
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

const toProductList = (data: any) => data.map((product: any) => toProduct(product))

export { toProduct, toProductList }