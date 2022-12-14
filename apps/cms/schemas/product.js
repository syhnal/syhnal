import isSlugUnique from "../utils/unique-slug"

export default {
  title: 'Товар',
  name: 'product',
  type: 'document',
  fields: [
    {
      title: 'Назва',
      name: 'title',
      type: 'object',
      fields: [
        {
          title: 'Українською',
          name: 'uk',
          type: 'string'
        },
        {
          title: 'Російською',
          name: 'ru',
          type: 'string'
        },
      ]
    },
    {
      title: 'Категорія',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      title: 'Бренд авто',
      name: 'brand',
      type: 'reference',
      to: [{ type: 'brand' }]
    },
    {
      title: 'Ціна',
      name: 'price',
      type: 'object',
      fields: [
        {
          title: 'Від',
          name: 'from',
          type: 'number'
        },
        {
          title: 'До',
          name: 'to',
          type: 'number'
        },
      ]
    },
    {
      title: 'Url',
      name: 'slug',
      type: 'slug',
      options: {
        source: doc => `${doc.title.ua}`, // doc => `${doc.title}-${doc.category}`
        isUnique: isSlugUnique,
      },
      validation: slug => slug.required()
    },
  ]
}