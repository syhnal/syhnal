const Footer = () => {
  return (
    <footer className="border-top pt-4 pb-5 d-flex justify-content-center">
      <div>
        <div className="d-flex gap-4 gap-sm-5 mb-4">
          <div className="d-flex flex-column gap-3">
            <span>Про нас</span>
            <span>Отримання й оплата</span>
            <span>Повернення та обмін</span>
            <span>Угода користувача</span>
          </div>
          <div className="d-flex flex-column gap-3">
            <span>Умань, ринок Міщанка,<br />павільйон 48</span>
            <span>095 505 17 00</span>
            <span>050 563 43 41</span>
          </div>
        </div>
        <span className="text-muted">signal.ua ©2022. Всі права захищені</span>
      </div>
    </footer>
  )
}

export { Footer }