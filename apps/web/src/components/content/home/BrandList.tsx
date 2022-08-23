import { Brand } from "logic"
import Image from "next/image"
import Link from "next/link"
import { useStoreContext } from "../../../utils"
import { urlFor } from "../../../utils/cms/sanity"

interface BrandsProps {
  items: Brand[]
}

const StockBrandList = ({ items }: BrandsProps) => {
  const store = useStoreContext()

  const setBrand = (value: string) => {
    store?.search.brand.set(value)
  }

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-2 row-cols-lg-3 gy-3 gx-5">
      {items.map(brand =>
        <div onClick={() => setBrand(brand.title)}>
          <Link href="/catalog" key={brand.id}>
            <a className="col">
              <div className="border-bottom d-flex justify-content-between align-items-center">
                <Image src={urlFor(brand.img).url()} width='50px' height='50px' quality={100} />
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