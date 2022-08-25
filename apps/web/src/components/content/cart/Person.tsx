import { handleClientScriptLoad } from 'next/script'
import { FloatingInput } from "ui"
import { StateProp } from "../../../utils/types"

interface PersonProps {
  name: StateProp<string>
  surname: StateProp<string>
  phone: StateProp<string>
}

const Person = ({ name, surname, phone }: PersonProps) => {
  const checkPhoneInput = (val: string): boolean => {
    if (val.length > 9) return false

    const last = val.at(val.length - 1)
    return last ? "1234567890".includes(last) ? true : false : true
  }

  return (
    <div className="row row-cols-2 g-3">
      <div className="col">
        <FloatingInput label="Ім'я" val={name.val} setVal={name.set} />
      </div>
      <div className="col">
        <FloatingInput label="Прізвище" val={surname.val} setVal={surname.set} />
      </div>
      <div className="col w-100">
        <FloatingInput front='+380' label="Номер телефону" val={phone.val} setVal={phone.set}
          check={checkPhoneInput} />
      </div>
    </div>
  )
}

export { Person }