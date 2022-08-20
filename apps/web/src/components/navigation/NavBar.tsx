import Link from "next/link"
import { IconInput } from "ui"
import { useStoreContext } from "../../utils/store"

const NavBar = () => {
  const store = useStoreContext()

  return (
    <nav className="border-bottom py-2 mb-3">
      <div className="container-xl">

        <div className="mb-3 d-flex justify-content-between">
          <span>Умань, ринок «Міщанка», павільйон 48</span>
          <div className="fw-semibold">
            <span className="me-4">050 563 43 41</span>
            <span>095 505 17 00</span>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <button className="btn btn-outline-primary btn-lg">
            Каталог
          </button>
          <Link href="/">
            <a className="fs-3 mx-5 text-dark" style={{ fontFamily: "Bender" }} >
              СИГНАЛ
            </a>
          </Link>
          <IconInput icon="search" placeholder="Пошук" />

          <Link href="/cart">
            <a className="ms-5 d-flex flex-column align-items-center">
              <i className="bi bi-cart2 fs-4 position-relative">
                <div className="position-absolute translate-middle bg-light rounded-1 text-center"
                  style={{
                    fontSize: '12px', top: '25%', padding: '0 10%',
                    lineHeight: '1.1', fontStyle: 'normal', left: '95%'
                  }}
                >
                  {store?.cart.val.length}
                </div>
              </i>
              <div className="text-secondary" style={{ fontSize: '11px' }}>Кошик</div>
            </a>
          </Link>

        </div>
      </div>
    </nav>
  )
}

export { NavBar }