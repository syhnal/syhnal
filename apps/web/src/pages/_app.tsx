// installed
import type { AppProps } from 'next/app'

// local
import '../styles/globals.css'
import { Layout } from '../components'
import { LangPackProvider, StoreProvider } from '../utils'


const SyhnalApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LangPackProvider langPack={pageProps.langPack}>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </LangPackProvider>
  )
}

export default SyhnalApp