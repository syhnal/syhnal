import { Lang } from './lang'

export interface Category {
  id: string
  title: string
  img?: any
  slug: string
}

const toCategory = (data: any, locale: Lang): Category => {
  let category: Category = {
    id: data._id,
    title: data.title[locale],
    slug: data.slug.current
  }
  if (data.hasOwnProperty("img")) category.img = data.img
  return category
}

const toCategoryList = (dataList: any, locale: Lang): Category[] =>
  dataList.map((data: any) => toCategory(data, locale))

export { toCategory, toCategoryList }