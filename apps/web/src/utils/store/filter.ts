import { Product } from 'logic';
import { useStore } from './store';

const filterCatalog = (products: Product[]): Product[] => {
  const store = useStore()
  const start = store ? store.search.start.val.toLowerCase() : ""

  return products
    .filter(product =>
      product.title.toLowerCase().startsWith(start) &&
      store && product.brand.title.startsWith(store.search.brand.val)
    )

}

export { filterCatalog }