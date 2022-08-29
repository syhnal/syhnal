import Link from "next/link"

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <a className="fs-2 text-dark"
          style={{
            fontFamily: "Bender",
            backgroundColor: "black",
            backgroundImage: "linear-gradient(180deg, rgba(20,117,188,1) 57%, rgba(255,203,21,1) 43%)",
            WebkitBackgroundClip: "text",
            MozBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }} >
          С<span className='d-none d-sm-inline'>ИГНАЛ</span>
        </a>
      </Link>
    </div>
  )
}

export { Logo }