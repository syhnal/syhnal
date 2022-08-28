import { useRouter } from "next/router"
import { IconInput } from "ui"
import { useLangPack } from '../../utils'
import { useStore } from "../../utils/store/store"
import { CartLink } from "./CartLink"
import { Logo } from "./Logo"

const NavBar = () => {
  const store = useStore()
  const router = useRouter()
  const langPack = useLangPack()

  const search = () => router.push("/catalog")

  return (
    <nav className="mb-3">
      <div className="border-bottom py-3 ">
        <div className="container-xl">

          <div className="mb-2 d-flex justify-content-between">
            <div>{langPack.navigation.place}</div>
            <div style={{ maxWidth: "500px" }}>
              <div className="fw-semibold d-flex flex-wrap justify-content-end">
                <div>murka_kr@ukr.net</div>
                <div className='ms-2 ms-md-3'>050 563 43 41</div>
                <div className='ms-2 ms-md-3'>095 505 17 00</div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className='me-3 me-md-5 '>
              <Logo />
            </div>
            {store ?
              <IconInput icon="search" placeholder={langPack.navigation.search}
                val={store.search.start.val} setVal={store.search.start.set}
                enterClick={search} />
              : null}
            <div className='ms-3 ms-md-5'>
              <CartLink count={store ?
                store.cart.stock.val.length + store.cart.order.val.length
                : 0} />
            </div>
          </div>
        </div>
      </div>

    </nav >
  )
}

export { NavBar }