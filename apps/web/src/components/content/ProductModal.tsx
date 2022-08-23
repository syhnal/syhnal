import { Product } from "logic"
import Image from "next/image"
import Link from "next/link"
import { MouseEventHandler, useEffect } from "react"
import { urlFor } from "../../utils/cms/sanity"
import { useStoreContext } from "../../utils/store"

interface ProductModalProps {
  product: Product
  id: string

  inCart?: boolean
  toCartClick: MouseEventHandler

}

const ProductModal = ({ product, id, inCart, toCartClick }: ProductModalProps) => {
  return (
    <div className="modal" id={id}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body px-5 pb-5 pt-1 row row-cols-1 row-cols-md-2">
            {product ?
              <div className="col">
                <Image src={urlFor(product.img).url()} width={400} height={400} quality={100} />
              </div>
              : null}
            <div>
              <h2 className="fw-semibold">{product.title.ua}</h2>
              <h3 className="fw-bold mt-4">Від {product.price.from} грн</h3>
              <p className="mb-2"><span className="text-danger">!</span> Уточнюйте ціну під час замовлення</p>

              <div className="mb-3 d-flex align-items-center">
                <Image src={urlFor(product.brand.img).url()} width='50px' height='50px' quality={100} />
                <span className="ms-3">{product.brand.title}</span>
              </div>

              <div className="d-flex justify-content-between">
                <button className={`btn btn-lg btn-${inCart ? "success" : "primary"}`}
                  onClick={inCart ? undefined : toCartClick} data-bs-dismiss="modal"
                >
                  {inCart ? "Додано" : "В кошик"}
                </button>
                <Link href={`/order/${product.slug}`}>
                  <button className="btn btn-lg btn-outline-primary" data-bs-dismiss="modal">
                    Замовити в 1 клік
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductModal }