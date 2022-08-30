import { useLangPack } from '../../utils'

const Footer = () => {
  const langPack = useLangPack()

  return (
    <footer className="border-top py-4 mt-4 text-muted d-flex justify-content-center gap-4 gap-sm-5">
      <div>signal-ua ©2022</div>
      <div>{langPack.navigation.rights}</div>
    </footer>
  )
}

export { Footer }