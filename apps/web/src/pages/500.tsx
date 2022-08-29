import { NextPage } from 'next'
import { toLang } from 'logic';
import { GetStaticProps, ILangPack } from '../utils';

interface Error500Props {
  langPack: ILangPack
}

const Error500: NextPage<Error500Props> = ({ langPack }) => {
  return (
    <div >
      <h2 className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        {langPack.error500.header}
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
        error500: require(`../langs/error500/${lang}.json`)
      }
    }
  }
}

export default Error500
export { getStaticProps }