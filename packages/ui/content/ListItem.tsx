import { MouseEventHandler, FC } from "react"

interface CardProps {
  header: string
  headerSize?: number
}

const ListItem: FC<CardProps> = ({ header, headerSize = 5, children }) => {
  return (
    <li className="list-group-item px-0 py-3">
      <div className="row row-cols-1 row-cols-md-2 align-items-center">
        <div className={`fs-${headerSize}`}>{header}</div>
        <div>
          {children}
        </div>
      </div>
    </li>
  )
}

export { ListItem }