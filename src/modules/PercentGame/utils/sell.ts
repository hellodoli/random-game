import { GradientSet } from 'types'
import { getDispatch } from 'utils/reduxStore'
import {
  DEFAULT_TICKET_PRICE,
  DEFAULT_SELL_PRIZE_PERCENT,
  PRIZE_SET,
} from 'modules/PercentGame/constants'
import { META_STATUS } from 'modules/PercentGame/types/enum'
import { actions } from 'modules/PercentGame/slices'

export const getItemTextName = (quantity: number) => {
  return quantity > 1 ? 'items' : 'item'
}

export const getPrice = (price: number) => {
  return Math.round(DEFAULT_SELL_PRIZE_PERCENT * price)
}

export const getSellOnePrize = (gradientSet: GradientSet) => {
  const prize = PRIZE_SET[gradientSet]
  if (!prize) return 0
  const ticket = prize.consume
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

export const toggleMetaAction = (value: boolean) => {
  return {
    value: !value,
    status: value ? META_STATUS.INITITAL : META_STATUS.PREPARE,
  }
}

export const dispatchChangeMetaStatus = (status: META_STATUS) => {
  const dispatch = getDispatch()
  dispatch(
    actions.changeMetaStatus({
      status,
    }),
  )
}
