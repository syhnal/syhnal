import Image from "next/image"
import Link from "next/link"

const Brands = () => {

  const brands = [
    'Chery', 'Geely', 'Daewoo', 'Mazda', 'Toyota', 'Skoda', 'Mercedes',
    'Hyundai', 'Mitsubishi', 'Lexus', 'Honda', 'Chevrolet', 'BMW'
  ]

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 gy-1 gx-5">
      {brands.map(brand =>
        <Link href={`/`} key={brand}>
          <a className="col d-flex justify-content-between align-items-center">
            <Image src={`/brands/${brand.toLowerCase()}.png`} width='60px' height='60px' quality={100} />
            <div>{brand}</div>
            <i className="bi bi-chevron-right" />
            {/* <img src={`/brands/${brand.toLowerCase()}.png`} style={{ width: '50px' }} /> */}
          </a>
        </Link>
      )}
    </div>
  )

}

export { Brands }