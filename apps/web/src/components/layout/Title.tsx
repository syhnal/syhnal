import Head from "next/head"

type TitleProps = {
  val: string
}

const Title = ({ val }: TitleProps) => {
  return (
    <Head>
      <title>{val}</title>
    </Head>
  )
}

export { Title }