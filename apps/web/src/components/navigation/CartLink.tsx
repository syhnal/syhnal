import { count } from "console"
import Link from "next/link"
import { useLangPack } from '../../utils'

interface CartLinkProps {
  count: number
}

const CartLink = ({ count }: CartLinkProps) => {
  const langPack = useLangPack()

  return (
    <Link href="/cart">
      <a className="d-flex flex-column align-items-center">
        <i className="bi bi-cart2 fs-4 position-relative">
          <div className="position-absolute translate-middle bg-light rounded-1 text-center"
            style={{
              fontSize: '12px', top: '25%', padding: '0 10%',
              lineHeight: '1.1', fontStyle: 'normal', left: '95%'
            }}
          >
            {count}
          </div>
        </i>
        <div className="text-secondary" style={{ fontSize: '11px' }}>
          {langPack.navigation.cart}
        </div>
      </a>
    </Link>
  )
}

export { CartLink }