import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components/layout/Layout'
import { StoreProvider } from '../utils/store'
import { GetStaticProps } from 'next'
import { getClient } from '../utils/cms/sanity.server'
import groq from 'groq'
import { Category, toCategoryList } from 'logic'

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
