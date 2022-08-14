import Image from 'next/image'

const Banner = () => {
  return (
    <div className="position-relative">
      <Image className='rounded '
        objectFit='cover'
        objectPosition='50% 65%'
        alt='Banner'
        src='/banner.png'
        width={1260} height={500} layout='responsive' />

      {/* bottom-0 start-0 m-5 */}
      <h1 className='text-white position-absolute'
        style={{ bottom: '7%', left: '4%', fontSize: '6.7vw' }}>
        Автозапчастини <br />під замовлення
      </h1>

    </div>
  )
}

export { Banner }