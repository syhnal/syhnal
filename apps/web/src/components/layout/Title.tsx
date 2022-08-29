import Head from "next/head"

interface TitleProps {
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