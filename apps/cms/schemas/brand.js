import isSlugUnique from "../utils/unique-slug"

export default {
  name: 'brand',
  type: 'document',
  fields: [
    {
      title: 'Назва (англійською)',
      name: 'title',
      type: 'string'
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
        source: 'title',
        isUnique: isSlugUnique,
      },
      validation: slug => slug.required()
    }
  ]
}