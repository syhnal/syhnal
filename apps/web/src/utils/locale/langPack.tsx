import { GetStaticProps } from 'next';
import { createContext, FC, useContext } from 'react';

interface ILangPack {
  navigation: {
    [key: string]: string
  },
  [key: string]: any
}

const LangPackContext = createContext<ILangPack>({
  navigation: {}
})

interface LangPackProps {
  langPack: ILangPack
}

const LangPackProvider: FC<LangPackProps> = ({ children, langPack }) => {
  return (
    <LangPackContext.Provider value={langPack}>
      {children}
    </LangPackContext.Provider>
  )
}

const useLangPack = () => useContext(LangPackContext);

type GetLangPackStaticProps = GetStaticProps<LangPackProps>

export { LangPackProvider, useLangPack }
export type { GetLangPackStaticProps as GetStaticProps }