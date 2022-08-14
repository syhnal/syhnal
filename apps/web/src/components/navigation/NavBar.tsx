import Link from "next/link"
import { IconInput } from "ui"

const NavBar = () => {
  return (
    <div className="border-bottom py-2 mb-3">
      <div className="d-flex align-items-center container-xl">
        <button className="btn btn-outline-primary btn-lg">
          Каталог
        </button>
        <span className="fs-3 mx-5" style={{ fontFamily: "Bender" }} >
          СИГНАЛ
        </span>
        <IconInput icon="search" placeholder="Пошук" />
        <span className="mx-5 text-nowrap fw-semibold">050 563 43 41</span>

        <Link href="/cart" className="d-flex flex-column align-items-center">
          <a>
            <i className="bi bi-cart2 fs-4 position-relative">
              <div className="position-absolute translate-middle bg-light rounded-1 text-center"
                style={{
                  fontSize: '12px', top: '25%', padding: '0 10%',
                  lineHeight: '1.1', fontStyle: 'normal', left: '95%'
                }}
              >
                1
              </div>
            </i>
            <div className="text-secondary" style={{ fontSize: '11px' }}>Кошик</div>
          </a>
        </Link>

      </div>
    </div>
  )
}

export { NavBar }