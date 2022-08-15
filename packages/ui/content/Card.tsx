import { MouseEventHandler } from "react"

type CardProps = {
  img?: string
  header: string
  content: string
  onBtnClick?: MouseEventHandler
  btnLabel?: string
}

const Card = ({ img, header, content, onBtnClick, btnLabel }: CardProps) => {
  return (
    <div className="card border-0">
      <img src={img} className="card-img-top" alt="" />
      <hr className="p-0 m-0" />
      <div className="card-body">
        <h5 className="card-title">{header}</h5>
        <p className="card-text">{content}</p>
        {btnLabel ? <button className="btn btn-outline-primary" onClick={onBtnClick}>{btnLabel}</button> : null}
      </div>
    </div>
  )
}

export { Card }