import { Dispatch, SetStateAction, useRef } from "react"

interface FloatingInputProps {
  id: string
  label: string
  val: string,
  setVal: Dispatch<SetStateAction<string>>
}

const FloatingInput = ({ id, label, val, setVal }: FloatingInputProps) => {
  const input = useRef<any>(null)
  const focus = () => input.current?.focus()

  const change = (e: any) => setVal(e.target.value)

  return (
    <div onClick={focus} className="rounded-3 border d-flex flex-column user-select-none"
      style={{ cursor: "text" }}
    >
      <input className="rounded-3 border-0 px-4 pt-3 pb-1" id={id}
        style={{ outline: "none" }} ref={input} value={val} onChange={change}
      />
      <span className="pb-3 px-4 text-muted"
        style={{ fontSize: "12px" }}>
        {label}
      </span>
    </div>
  )
}

export { FloatingInput }