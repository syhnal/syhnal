import { MouseEventHandler } from "react"

type CardProps = {
  img?: string
  header: string
  content: string

  btnColor?: string
  btnLabel?: string
  onBtnClick?: MouseEventHandler

  dataBsToggle?: string
  dataBsTarget?: string
  onCardClick?: MouseEventHandler
}

const Card = ({ img, header, content, onBtnClick, btnLabel, btnColor, onCardClick, dataBsTarget, dataBsToggle }: CardProps) => {
  return (
    <div className="card border-0">
      <div data-bs-toggle={dataBsToggle} data-bs-target={dataBsTarget}
        onClick={onCardClick}
        style={{ cursor: dataBsToggle ? "pointer" : "default" }}>
        <img src={img} className="card-img-top" alt="" />
        <hr className="p-0 m-0" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <p className="card-text">{content}</p>
        {btnLabel
          ? <button className={`btn btn-outline-${btnColor} shadow-none`} onClick={onBtnClick}>
            {btnLabel}
          </button>
          : null
        }
      </div>
    </div>
  )
}

export { Card }