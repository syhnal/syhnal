import Link from "next/link"
import { useLangPack } from '../../../utils'

const NoInStock = () => {
  const langPack = useLangPack()

  return (
    <div className="text-center">
      <h2 className="mb-5">{langPack.catalog.noInStock}</h2>
      <div className="d-flex justify-content-center gap-3 gap-md-5 align-items-center">
        <h2>{langPack.catalog.canOrder}</h2>
        <Link href={`/custom`}>
          <div className="btn btn-lg btn-dark-blue shadow-none">{langPack.catalog.order}</div>
        </Link>
      </div>
    </div>
  )
}

export { NoInStock }