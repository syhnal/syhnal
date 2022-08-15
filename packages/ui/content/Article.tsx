type ArticleProps = {
  header: string
  paragraphs: string[]
  className?: string
}

const Article = ({ header, paragraphs, className }: ArticleProps) => {
  return (
    <div className={className}>
      <h2>{header}</h2>
      {paragraphs.map((p, i) => <p key={i} className="my-3">{p}</p>)}
    </div>
  )
}

export { Article }