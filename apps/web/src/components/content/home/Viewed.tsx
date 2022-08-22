import { useStoreContext } from "../../../utils/store"
import { ProductList } from "../ProductList"

const Viewed = () => {
  const store = useStoreContext()

  return store && store.viewed.val.length > 0
    ? <ProductList items={store.viewed.val} />
    : <div>Ви ще нічого не переглянули</div>
}

export { Viewed }