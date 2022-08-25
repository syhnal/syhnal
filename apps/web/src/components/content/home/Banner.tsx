import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
    <div className="position-relative">
      <Image className='rounded '
        objectFit='cover'
        objectPosition='50% 80%'
        alt='Banner'
        src='/banner.png'
        width={1260} height={500} layout='responsive'
      />

      <div className='position-absolute' style={{ bottom: '7%', left: '4%' }}>
        <h1 className='text-white'
          style={{ fontSize: '5.4vw', fontWeight: 800 }}>
          Автозапчастини<br />під замовлення
        </h1>
        <Link href='/custom'>
          <a className='btn btn-main btn-lg mt-2'>Замовити</a>
        </Link>
      </div>

    </div>
  )
}

export { Banner }