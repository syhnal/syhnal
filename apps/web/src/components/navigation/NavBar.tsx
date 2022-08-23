import { Category } from "logic"
import Link from "next/link"
import { useRouter } from "next/router"
import { IconInput } from "ui"
import { useStoreContext } from "../../utils/store"
import { CartLink } from "./CartLink"

interface NavBarProps {
  categories: Category[]
}

const NavBar = ({ categories }: NavBarProps) => {
  const store = useStoreContext()
  const router = useRouter()

  const search = () => router.push("/catalog")


  return (
    <nav className="mb-3">
      <div className="border-bottom py-2 ">
        <div className="container-xl">

          <div className="mb-3 d-flex justify-content-between">
            <span>Умань, ринок «Міщанка», павільйон 48</span>
            <div className="fw-semibold">
              <span className="me-4">050 563 43 41</span>
              <span>095 505 17 00</span>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <button className="btn btn-outline-primary btn-lg shadow-none"
              data-bs-toggle="collapse" data-bs-target="#navbarCategories"
              aria-expanded="false" aria-controls="navbarCategories">
              Каталог
            </button>
            <Link href="/">
              <a className="fs-3 mx-5 text-dark" style={{ fontFamily: "Bender" }} >
                СИГНАЛ
              </a>
            </Link>
            {store ?
              <IconInput icon="search" placeholder="Пошук" val={store.search.start.val} setVal={store.search.start.set} enterClick={search} />
              : null}
            <CartLink count={store ? store.cart.stock.val.length + store.cart.order.val.length : 0} />
          </div>
        </div>
      </div>
      <div className="collapse position-absolute bg-white w-100" id="navbarCategories" style={{ zIndex: 1 }}>
        <div className="container-xl py-4">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
            {categories.map(category =>
              <div key={category.id}
                data-bs-toggle="collapse" data-bs-target="#navbarCategories"
                aria-expanded="false" aria-controls="navbarCategories">
                <Link href={`/catalog/${category.slug}`}>
                  <div style={{ cursor: "pointer" }}>
                    {category.title.ua}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div >
    </nav >
  )
}

export { NavBar }