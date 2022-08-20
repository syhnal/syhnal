export interface Category {
  id: string
  title: {
    ua: string
    ru: string
  }
  img: any
  slug: string
}

const toCategory = (data: any): Category => {
  return {
    id: data._id,
    title: {
      ua: data.title.ua,
      ru: data.title.ru
    },
    slug: data.slug.current,
    img: data.img
  }
}

const toCategoryList = (dataList: any): Category[] =>
  dataList.map((data: any) => toCategory(data))

export { toCategory, toCategoryList }