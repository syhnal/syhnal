import { Dispatch, SetStateAction, useRef } from "react"

interface FloatingInputProps {
  label: string
  val: string
  front?: string
  setVal: (value: string) => void
  check?: (value: string) => boolean
}

const FloatingInput = ({ label, val, setVal, front, check }: FloatingInputProps) => {
  const input = useRef<any>(null)
  const focus = () => input.current.focus()

  const change = check
    ? (e: any) => { if (check(e.target.value)) setVal(e.target.value) }
    : (e: any) => setVal(e.target.value)

  return (
    <div onClick={focus} className="rounded-3 border d-flex flex-column user-select-none"
      style={{ cursor: "text" }}
    >
      <div className='d-flex align-items-center px-4 pt-3 pb-1'>
        {front ? <span>{front}</span> : null}
        <input className="border-0 p-0 w-100" autoFocus={false}
          style={{ outline: "none" }} ref={input} value={val} onChange={change}
        />
      </div>

      <span className="pb-3 px-4 text-muted"
        style={{ fontSize: "12px" }}>
        {label}
      </span>
    </div>
  )
}

export { FloatingInput }