import { ReactElement } from "react"

type IconInputProps = {
  icon: string,
  placeholder: string
}

const IconInput = ({ icon, placeholder }: IconInputProps) => {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white text-primary border-primary  border-end-0">
        <i className={`bi bi-${icon} fs-5`} style={{ transform: 'scaleX(-1)', WebkitTransform: 'scaleX(-1)' }} />
      </span>
      <input className="form-control form-control-lg shadow-none border-start-0 border-primary ps-0"
        placeholder={placeholder} />
    </div>
  )
}

export { IconInput }