export interface Category {
  id: string
  title: {
    uk: string
    ru: string
  }
  img?: any
  slug: string
}

const toCategory = (data: any): Category => {
  let category: Category = {
    id: data._id,
    title: {
      uk: data.title.uk,
      ru: data.title.ru
    },
    slug: data.slug.current
  }

  if (data.hasOwnProperty("img")) category.img = data.img

  return category
}

const toCategoryList = (dataList: any): Category[] =>
  dataList.map((data: any) => toCategory(data))

export { toCategory, toCategoryList }