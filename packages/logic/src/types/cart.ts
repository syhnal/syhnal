import { Car } from "./car"

export interface OrderProduct {
  name: string
  car: Car
}

export interface CartItem<T> {
  val: T
  count: number
}