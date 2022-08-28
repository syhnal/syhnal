import { useRouter } from 'next/router'
import { Locale } from 'logic';

const useLocale = (): Locale => {
  const { locale = 'uk' } = useRouter()
  return locale as Locale;
}

const toLocale = (locale: string): Locale => locale as Locale;

export { useLocale, toLocale }