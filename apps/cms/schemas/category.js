import isSlugUnique from "../utils/unique-slug"

export default {
  name: 'category',
  type: 'document',
  fields: [
    {
      title: 'Назва',
      name: 'title',
      type: 'object',
      fields: [
        {
          title: 'Українською',
          name: 'ua',
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
      title: 'Зображення',
      name: 'img',
      type: 'image'
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
    {
      title: 'Кіл-ть замовлень',
      name: 'orders',
      type: 'number',
      initialValue: 0
    },
  ]
}