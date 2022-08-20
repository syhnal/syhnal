import { Product } from "logic"
import Image from "next/image"
import { urlFor } from "../../utils/cms/sanity"

interface ProductModalProps {
  product: Product
}

const ProductModal = ({ product }: ProductModalProps) => {
  return (
    <div className="modal" id="productModal" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <Image src={urlFor(product.img).url()} width={50} height={50} />
            <div>
              <h2>{product.title}</h2>
              <span>{product.price.from} - {product.price.to}</span>
              <span>!
                Уточнюйте ціну під час замовлення</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductModal }