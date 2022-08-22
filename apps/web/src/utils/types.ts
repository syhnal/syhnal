import { Category } from "logic"
import { GetStaticProps } from "next"
import { Dispatch, SetStateAction } from "react"

export interface StateProp<T> {
  val: T
  set: Dispatch<SetStateAction<T>>
}

type LayoutStaticProps = {
  categories: Category[]
  [key: string]: any
}

type StaticProps = GetStaticProps<LayoutStaticProps>

export type { StaticProps as GetStaticProps }