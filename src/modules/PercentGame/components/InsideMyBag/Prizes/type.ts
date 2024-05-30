import { SELL_PRIZE_OPTION } from 'modules/PercentGame/types'

export interface ConfirmDeleteForwardRef {
  getDeleteItemValues: () => {
    type: SELL_PRIZE_OPTION
    itemQuantity: number
    customQuantity: number
  }
}

export interface ConfirmCutForwardRef {
  getCutItemValues: () => {
    itemQuantity: number
  }
}
