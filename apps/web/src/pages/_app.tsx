import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout/Layout'
import { StoreProvider } from '../utils/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default MyApp
