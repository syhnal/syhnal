interface CounterProps {
  count: number
  setCount: (value: number) => void
}

const Counter = ({ count, setCount }: CounterProps) => {
  return (
    <div className="d-flex justify-content-center  align-items-center">
      <i className={`bi bi-dash-lg fs-4 px-2 ${count == 1 ? "text-muted" : null}`}
        style={{ cursor: "pointer" }}
        onClick={() => { if (count > 1) setCount(count - 1) }} />
      <div className="user-select-none" style={{ fontWeight: 500 }}>
        {count}
      </div>
      <i className="bi bi-plus-lg fs-4 px-2" style={{ cursor: "pointer" }}
        onClick={() => setCount(count + 1)} />
    </div>
  )
}

export { Counter }