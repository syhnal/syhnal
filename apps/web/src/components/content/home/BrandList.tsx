import { Brand } from "logic"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../../../utils/cms/sanity"

interface BrandsProps {
  items: Brand[]
  link: string
}

const BrandList = ({ items, link }: BrandsProps) => {
  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-2 row-cols-lg-3 gy-3 gx-5">
      {items.map(brand =>
        <Link href={link} key={brand.id}>
          <a className="col">
            <div className="border-bottom d-flex justify-content-between align-items-center">
              <Image src={urlFor(brand.img).url()} width='50px' height='50px' quality={100} />
              {brand.title}
            </div>
          </a>
        </Link>
      )}
    </div>
  )

}

export { BrandList }