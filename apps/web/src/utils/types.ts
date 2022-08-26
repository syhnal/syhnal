import { Dispatch, SetStateAction } from "react"

export interface StateProp<T> {
  val: T
  set: Dispatch<SetStateAction<T>>
}