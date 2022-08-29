import { toLang } from 'logic';
import { NextPage } from 'next';
import { GetStaticProps, ILangPack } from '../utils';

interface PageNotFoundProps {
  langPack: ILangPack
}

const PageNotFound: NextPage<PageNotFoundProps> = ({ langPack }) => {
  return (
    <div >
      <h2 className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        {langPack.pageNotFound.header}
      </h2>
    </div>
  )
}

const getStaticProps: GetStaticProps = async ({ locale = 'uk' }) => {
  const lang = toLang(locale)

  return {
    props: {
      langPack: {
        navigation: require(`../langs/navigation/${lang}.json`),
        pageNotFound: require(`../langs/pageNotFound/${lang}.json`)
      }
    }
  }
}

export default PageNotFound
export { getStaticProps }