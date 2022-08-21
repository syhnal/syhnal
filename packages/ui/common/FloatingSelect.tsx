import { Dispatch, SetStateAction, useRef, useState } from "react"

interface FloatingSelectProps {
  id: string
  label: string
  options: any[]
  val: any
  setVal: Dispatch<SetStateAction<any>>
}

const FloatingSelect = ({ id, label, options, val, setVal }: FloatingSelectProps) => {
  return (
    <div className="dropdown">
      <div className="rounded-3 border px-4 py-3 d-flex justify-content-between align-items-center user-select-none"
        data-bs-toggle="dropdown" aria-expanded="false">

        <div className="d-flex flex-column">
          <span className="rounded-3 border-0 pb-1">{val}</span>
          <span className="text-muted" style={{ fontSize: "12px" }}>
            {label}
          </span>
        </div>
        <i className="bi bi-chevron-down fs-4" style={{ color: "#30AE25" }} />

      </div>
      <div className="dropdown-menu overflow-hidden p-0 w-100">
        <div className="overflow-auto" style={{ maxHeight: "40vh" }}>
          {options.map(option =>
            <li key={`option-${option}`} onClick={() => setVal(option)} className="dropdown-item user-select-none">
              {option}
            </li>
          )}
        </div>
      </div>

    </div>
  )
}

export { FloatingSelect }