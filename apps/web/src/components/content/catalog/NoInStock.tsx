import Link from "next/link"

const NoInStock = () => {
  return (
    <div className="text-center">
      <h2 className="mb-5">Нажаль, такої запчастини немає в наявності</h2>
      <div className="d-flex justify-content-center gap-3 gap-md-5 align-items-center">
        <h2>Ви можете її замовити</h2>
        <Link href={`/custom`}>
          <div className="btn btn-lg btn-primary shadow-none">Замовити</div>
        </Link>
      </div>
    </div>
  )
}

export { NoInStock }