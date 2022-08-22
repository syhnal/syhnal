// installed
import type { AppProps } from 'next/app'

// local
import '../styles/globals.css'
import { Layout } from '../components'
import { StoreProvider } from '../utils'


const SyhnalApp = ({ Component, pageProps }: AppProps) => {
  // <Layout categories={pageProps.categories}>
  // means that every page will have categories

  return (
    <StoreProvider>
      <Layout categories={pageProps.categories}>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default SyhnalApp