/* eslint-disable @typescript-eslint/no-unused-vars */
import { GradientSet } from 'types'
import {
  DEFAULT_TICKET_PRICE,
  DEFAULT_SELL_PRIZE_PERCENT,
  PRIZE_SET,
} from 'modules/PercentGame/constants'

export const getItemTextName = (quantity: number) => {
  return quantity > 1 ? 'items' : 'item'
}

export const getPrice = (price: number) => {
  return Math.round(DEFAULT_SELL_PRIZE_PERCENT * price)
}

export const getSellOnePrize = (gradientSet: GradientSet) => {
  const ticket = PRIZE_SET[gradientSet].consume
  const price = ticket * DEFAULT_TICKET_PRICE
  return getPrice(price)
}

export const getSellPrize = (
  gradientSet: GradientSet,
  quantity: number = 0,
) => {
  const pricePerOne = getSellOnePrize(gradientSet)
  const priceAll = quantity * pricePerOne
  return {
    pricePerOne,
    priceAll,
  }
}
