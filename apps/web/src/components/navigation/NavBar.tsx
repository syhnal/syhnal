import { Category } from "logic"
import Link from "next/link"
import { useRouter } from "next/router"
import { IconInput } from "ui"
import { useStore } from "../../utils/store"
import { CartLink } from "./CartLink"
import { Logo } from "./Logo"

interface NavBarProps {
  categories: Category[]
}

const NavBar = ({ categories }: NavBarProps) => {
  const store = useStore()
  const router = useRouter()

  const search = () => router.push("/catalog")

  return (
    <nav className="mb-3">
      <div className="border-bottom py-3 ">
        <div className="container-xl">

          <div className="mb-2 d-flex justify-content-between">
            <span>Умань, ринок «Міщанка», павільйон 48</span>
            <div className="fw-semibold">
              <span className="me-4">050 563 43 41</span>
              <span>095 505 17 00</span>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <Logo />
            {store ?
              <IconInput icon="search" placeholder="Пошук запчастин в наявності" val={store.search.start.val} setVal={store.search.start.set} enterClick={search} />
              : null}
            <CartLink count={store ? store.cart.stock.val.length + store.cart.order.val.length : 0} />
          </div>
        </div>
      </div>

    </nav >
  )
}

export { NavBar }