import Link from 'next/link'
import { useRouter } from 'next/router'
import { toLang } from 'logic'

const LangSwitch = () => {
  const { locale = "uk", route } = useRouter()
  const lang = toLang(locale)
  console.log(lang)
  return (
    <Link href={route} locale={lang == "uk" ? "ru" : "uk"}>
      <a>
        {lang == "ru" ? "Укр" : "Руc"}
      </a>
    </Link>
  )
}

export { LangSwitch }