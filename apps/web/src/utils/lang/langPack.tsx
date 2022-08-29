import { GetStaticProps } from 'next';
import { createContext, FC, useContext } from 'react';

interface ILangPack {
  navigation: {
    [key: string]: string
  },
  [key: string]: any
}

interface LangPackProps {
  langPack: ILangPack
}

type GetLangPackStaticProps = GetStaticProps<LangPackProps>

type Lang = "uk" | "ru";

const LangPackContext = createContext<ILangPack>({ navigation: {} })

const LangPackProvider: FC<LangPackProps> = ({ langPack, children }) => {
  return (
    <LangPackContext.Provider value={langPack}>
      {children}
    </LangPackContext.Provider>
  )
}

const useLangPack = () => useContext(LangPackContext);

const toLang = (locale: string): Lang => locale as Lang;

export { LangPackProvider, useLangPack, toLang }
export type { GetLangPackStaticProps as GetStaticProps, ILangPack }