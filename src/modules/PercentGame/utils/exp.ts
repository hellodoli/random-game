import { getDispatch } from 'utils/reduxStore'
import {
  PercentGameState,
  AddExpPayload,
  ListPrizeOb,
  MERGE_STATUS,
} from 'modules/PercentGame/types'
import { actions } from 'modules/PercentGame/slices'
import { DEFAULT_EXP_TAKE } from 'modules/PercentGame/constants'

const HOLD_EXP_RATE = 1.125
const BASE_EXP = 800

interface GetExp {
  curLevel?: number
  curExp?: number
  exp?: number
  acceptNagativeCurExp?: boolean
  preventDownLevel?: boolean
}

const defaultGetExp = {
  curLevel: 1,
  curExp: 0,
  exp: 0,
  acceptNagativeCurExp: false,
  preventDownLevel: true,
}

const defaultReturnGetExp = {
  exp: defaultGetExp.exp,
  curLevel: defaultGetExp.curLevel,
  curExp: defaultGetExp.curExp,
  isLevelUp: false,
  isLevelDown: false,
  nextLevel: defaultGetExp.curLevel,
  nextExp: defaultGetExp.curExp,
}

const isInvalidGetExp = ({
  curLevel = defaultGetExp.curLevel,
  curExp = defaultGetExp.curExp,
  acceptNagativeCurExp = defaultGetExp.acceptNagativeCurExp,
}: {
  curLevel?: number
  acceptNagativeCurExp?: boolean
  curExp?: number
}) => {
  if (curLevel < 1 || (!acceptNagativeCurExp && curExp < 0)) {
    return true
  }
  return false
}

export function getExpRate(level = 1) {
  const hold = HOLD_EXP_RATE
  const expRate = 1 + level * hold
  return expRate
}

export function getTotalExp(level = 1) {
  const baseExp = BASE_EXP
  const expRate = getExpRate(level)
  const totalExp = level * baseExp * expRate
  return {
    rate: expRate,
    total: totalExp,
  }
}

export function getSubExp({
  curLevel = defaultGetExp.curLevel,
  curExp = defaultGetExp.curExp,
  exp: expOrigin = defaultGetExp.exp,
  preventDownLevel = defaultGetExp.preventDownLevel,
}: GetExp) {
  const exp = expOrigin < 0 ? -1 * expOrigin : expOrigin
  const { total: prevTotal } = getTotalExp(curLevel - 1)
  const pointGap = curExp - exp
  let nextLevel = curLevel
  let nextExp = pointGap
  const isLevelUp = false
  let isLevelDown = false

  if (pointGap < 0) {
    if (!preventDownLevel) {
      nextLevel = curLevel - 1
      if (nextLevel < 1) {
        nextLevel = 1
        nextExp = 0
      } else {
        isLevelDown = true
        nextExp = prevTotal + pointGap
      }
    } else {
      nextExp = 0
    }
  }

  return {
    exp,
    curLevel,
    curExp,
    isLevelDown,
    isLevelUp,
    nextLevel,
    nextExp,
  }
}

export function getAddExp({
  curLevel = defaultGetExp.curLevel,
  curExp = defaultGetExp.curExp,
  exp = defaultGetExp.exp,
}: GetExp) {
  const { total: curTotalExp } = getTotalExp(curLevel)
  const maxExp = curTotalExp
  let nextLevel = curLevel
  let nextExp = curExp + exp
  if (curExp + exp >= maxExp) {
    // level up
    const updateLevel = ({
      nextLevel,
      nextExp,
      cbUpdate,
    }: {
      nextLevel: number
      nextExp: number
      cbUpdate: (nextExp: number, nextLevel: number) => void
    }) => {
      const { total: maxExp } = getTotalExp(nextLevel)
      if (nextExp >= maxExp) {
        const updateNextLevel = nextLevel + 1
        const updateNextExp = (maxExp - nextExp) * -1
        cbUpdate(updateNextExp, updateNextLevel)
        updateLevel({
          nextExp: updateNextExp,
          nextLevel: updateNextLevel,
          cbUpdate,
        })
      }
    }
    if (curExp + exp === maxExp) {
      nextLevel = curLevel + 1
      nextExp = 0
    } else {
      // check if level up with many step
      updateLevel({
        nextExp,
        nextLevel,
        cbUpdate: (updateNextExp, updateNextLevel) => {
          nextLevel = updateNextLevel
          nextExp = updateNextExp
        },
      })
    }
  } else {
    // NOT level up
  }

  return {
    exp,
    curLevel,
    curExp,
    isLevelUp: nextLevel > curLevel,
    isLevelDown: false,
    nextLevel,
    nextExp,
  }
}

export function getExp(props: GetExp = defaultGetExp) {
  const {
    curLevel = defaultGetExp.curLevel,
    curExp = defaultGetExp.curExp,
    exp = defaultGetExp.exp,
    acceptNagativeCurExp = defaultGetExp.acceptNagativeCurExp,
  } = props
  if (
    isInvalidGetExp({
      curExp,
      curLevel,
      acceptNagativeCurExp,
    })
  ) {
    /* invalid: some explain */
    return {
      ...defaultReturnGetExp,
      exp,
      curLevel,
      curExp,
      nextLevel: curLevel,
      nextExp: curExp,
    }
  }
  return exp >= 0 ? getAddExp(props) : getSubExp(props)
}

export function getPercentExp({
  curExp,
  totalExp,
  fractionDigits = 2,
}: {
  curExp: number
  totalExp: number
  fractionDigits?: number
}) {
  const percent = (curExp / totalExp) * 100
  return +percent.toFixed(fractionDigits)
}

export const dispatchAddExp = (exp: number) => {
  const dispatch = getDispatch()
  dispatch(actions.addExp({ exp }))
}

export const addExp_Redux = (
  state: PercentGameState,
  payload: AddExpPayload,
) => {
  const { exp } = payload
  const { nextExp, nextLevel } = getAddExp({
    curExp: state.curExp,
    curLevel: state.curLevel,
    exp,
  })
  state.curExp = nextExp
  state.curLevel = nextLevel
}

export const getExpSetPrizesAfterRoll = (setPrizes: ListPrizeOb) => {
  let exp = 0
  const prizes = Object.values(setPrizes)
  for (let i = 0; i < prizes.length; i++) {
    const prize = prizes[i]
    const expPrize =
      DEFAULT_EXP_TAKE[MERGE_STATUS.MERGE_SUCCESS][prize.gradientSet]
    exp += expPrize
  }
  return exp
}
