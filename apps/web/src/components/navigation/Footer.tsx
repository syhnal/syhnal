const Footer = () => {
  return (
    <footer className="border-top py-4 d-flex justify-content-center mt-4">
      <div>
        <div className="d-flex gap-4 gap-sm-5">
          <div className="d-flex flex-column gap-3">
            <span>Угода користувача</span>
            <span className="text-muted">signal.ua ©2022</span>
          </div>
          <div className="d-flex flex-column gap-3">
            <span>Повернення та обмін</span>
            <span className="text-muted">Всі права захищені</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }