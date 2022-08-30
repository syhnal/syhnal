import Head from 'next/head'
import Script from 'next/script'
import { FC } from 'react'
import { Footer } from '../navigation/Footer'
import { NavBar } from '../navigation/NavBar'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="title" content="Автомагазин Сигнал" />
        <meta name="description" content="Каталог автозапчастин магазину Сигнал. Працює в місті Умань, Краматорськ." />
        <meta name="keywords" content="сигнал, автомагазин, каталог, автозапчастини, автозапчасти, Умань, умань, краматорськ, краматорск, магазин" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Ukrainian" />

        <meta name="geo.region" content="UA-71" />
        <meta name="geo.placename" content="Uman" />
        <meta name="geo.position" content="48.749762;30.220305" />
        <meta name="ICBM" content="48.749762, 30.220305" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous" rel="stylesheet" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous" />

      <NavBar />

      <div style={{ minHeight: "68vh" }}>
        {children}
      </div>

      <Footer />
    </>
  )
}

export { Layout }