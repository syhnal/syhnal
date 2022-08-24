import Link from "next/link"

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <a className="fs-3 me-3 me-md-5 text-dark"
          style={{
            fontFamily: "Bender",
            backgroundColor: "black",
            backgroundImage: "linear-gradient(180deg, rgba(20,117,188,1) 50%, rgba(252,220,9,1) 50%)",
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }} >
          СИГНАЛ
        </a>
      </Link>
    </div>
  )
}

export { Logo }