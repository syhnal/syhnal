import Link from 'next/link'
import { useRouter } from 'next/router'
import { toLang } from 'logic'

const LangSwitch = () => {
  const { locale = "uk", asPath } = useRouter()
  const lang = toLang(locale)
  return (
    <Link href={asPath} locale={lang == "uk" ? "ru" : "uk"}>
      <a>
        {lang == "ru" ? "Укр" : "Руc"}
      </a>
    </Link>
  )
}

export { LangSwitch }