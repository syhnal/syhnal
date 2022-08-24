import { Brand } from "logic"
import { useStore } from "../../../utils"

interface SearchBrandProps {
  brands: Brand[]
}

const SearchBrand = ({ brands }: SearchBrandProps) => {
  const store = useStore()

  const select = (e: any) => {
    if (store) store.search.brand.set(e.target.value)
  }

  return (
    <select className="form-select form-select-lg shadow-none" onChange={select}>
      <option value="">Усі марки авто</option>
      {brands.map(brand =>
        <option key={brand.id} value={brand.title}>{brand.title}</option>
      )}
    </select>
  )
}

export { SearchBrand }