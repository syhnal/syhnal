import { Product } from "logic"
import Image from "next/image"
import { MouseEventHandler } from "react"
import { urlFor } from "../../utils/cms/sanity"

interface ProductModalProps {
  product: Product
  id: string

  inCart?: boolean
  toCartClick: MouseEventHandler

}

const ProductModal = ({ product, id, inCart, toCartClick }: ProductModalProps) => {
  return (
    <div className="modal" id={id} >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body p-5 row">
            <div className="col">
              <Image src={urlFor(product.img).url()} width={400} height={400} />
            </div>
            <div className="col">
              <h2 className="fw-semibold">{product.title.ua}</h2>
              <h3 className="fw-bold">Від {product.price.from} грн</h3>
              <p><span className="text-danger">!</span> Уточнюйте ціну під час замовлення</p>

              <div className="d-flex justify-content-between">
                <button className={`btn btn-lg btn-${inCart ? "success" : "primary"}`}
                  onClick={inCart ? undefined : toCartClick} data-bs-dismiss="modal"
                >
                  {inCart ? "Додано" : "В кошик"}
                </button>
                <button className="btn btn-lg btn-outline-primary">Замовити в 1 клік</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductModal }