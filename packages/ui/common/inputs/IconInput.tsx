import { ReactElement, useState } from "react"

type IconInputProps = {
  icon: string,
  placeholder: string
  val: string
  setVal: (value: string) => void
  enterClick: () => void
}

const IconInput = ({ icon, placeholder, val, setVal, enterClick }: IconInputProps) => {
  const enter = (e: any) => {
    if (e.key == "Enter") {
      enterClick()
    }
  }

  return (
    <div className="input-group">
      <span className="input-group-text bg-white text-primary border-primary  border-end-0">
        <i className={`bi bi-${icon} fs-5`}
          style={{ transform: 'scaleX(-1)', WebkitTransform: 'scaleX(-1)' }} onClick={enterClick} />
      </span>
      <input className="form-control form-control-lg shadow-none border-start-0 border-primary ps-0"
        onChange={(e: any) => setVal(e.target.value)} value={val} onKeyUp={enter}
        placeholder={placeholder} />
    </div>
  )
}

export { IconInput }