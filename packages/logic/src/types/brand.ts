export interface Brand {
  id: string
  title: string
  img: any
  slug: string
}

const toBrand = (data: any): Brand => {
  return {
    id: data._id,
    title: data.title,
    img: data.img,
    slug: data.slug.current
  }
}

const toBrandList = (dataList: any): Brand[] => dataList.map((data: any) => toBrand(data))

const uniqueBrand = (value: Brand, index: number, self: Brand[]) =>
  self.findIndex(brand => brand.id == value.id) == index

export { toBrand, toBrandList, uniqueBrand }

/*
{
    "_createdAt": "2022-08-17T15:12:49Z",
    "_id": "0d01e09a-5ce3-4dbd-af9e-a6ad632d16d6",
    "_rev": "GGj2zI7BEOukYB0dMASrBY",
    "_type": "brand",
    "_updatedAt": "2022-08-17T15:12:49Z",
    "img": {
        "_type": "image",
        "asset": {
            "_ref": "image-a731a3dde333b3bac0f04fa4930e26ded1e53d5d-500x500-png",
            "_type": "reference"
        }
    },
    "slug": {
        "_type": "slug",
        "current": "honda"
    },
    "title": "Honda"
}
*/