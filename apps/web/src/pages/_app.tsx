// installed
import type { AppProps } from 'next/app'

// local
import '../styles/globals.css'
import { Layout } from '../components'
import { StoreProvider } from '../utils'


const SyhnalApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

export default SyhnalApp