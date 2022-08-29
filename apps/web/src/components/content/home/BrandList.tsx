import Image from "next/image"
import Link from "next/link"
import { Brand } from "logic"
import { urlFor, useStore } from "../../../utils"

interface BrandsProps {
  items: Brand[]
}

const StockBrandList = ({ items }: BrandsProps) => {
  const store = useStore()

  const setBrand = (value: string) => {
    store?.search.brand.set(value)
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-2 row-cols-lg-3 gy-3 gx-5">
      {items.map(brand =>
        <div onClick={() => setBrand(brand.title)} key={brand.id}>
          <Link href="/catalog">
            <a className="col">
              <div className="border-bottom d-flex justify-content-between align-items-center">
                <Image src={urlFor(brand.img).url()} width='50px' height='50px'
                  quality={100} alt="" />
                {brand.title}
              </div>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export { StockBrandList }