import { SORT_TYPE } from './enum'

export interface SortPrize {
  label: string
  value: SORT_TYPE
}

export type ListSortPrizeArr = SortPrize[]
