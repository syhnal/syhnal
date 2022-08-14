import Image from "next/image"

const Brands = () => {

  const brands = [
    'Chery', 'Geely', 'Daewoo', 'Mazda', 'Toyota', 'Skoda', 'Mercedes',
    'Hyundai', 'Mitsubishi', 'Lexus', 'Honda', 'Chevrolet', 'BMW'
  ]

  return (
    <div className="row row-cols-1 row-cols-md-5 g-2">
      {brands.map(brand =>
        <div className="col">
          {/* <Image src={`/brands/${brand.toLowerCase()}.png`} width={50} height={50} objectFit="cover" quality={100} /> */}

          <img src={`/brands/${brand.toLowerCase()}.png`} style={{ width: '50px' }} />
        </div>
      )}
    </div>
  )

}

export { Brands }