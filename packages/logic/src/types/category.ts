import { Locale } from './locale'

export interface Category {
  id: string
  title: string
  img?: any
  slug: string
}

const toCategory = (data: any, locale: Locale): Category => {
  let category: Category = {
    id: data._id,
    title: data.title[locale],
    slug: data.slug.current
  }
  if (data.hasOwnProperty("img")) category.img = data.img
  return category
}

const toCategoryList = (dataList: any, locale: Locale): Category[] =>
  dataList.map((data: any) => toCategory(data, locale))

export { toCategory, toCategoryList }