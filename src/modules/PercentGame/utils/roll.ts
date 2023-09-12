import { RollResult, RESULT_ROLL_TYPE } from 'modules/PercentGame/types'

export const getRateNumberArr = (rates: RollResult[]) => {
  return rates.map((rate) => rate.rate)
}

export const getRateTypeArr = (rates: RollResult[]) => {
  return rates.map((rate) => rate.type)
}

export const getTypeByRate = (rates: RollResult[], rate: number) => {
  return rates.find((r) => r.rate === rate)?.type || RESULT_ROLL_TYPE.NOTHING
}

export const getRandom = (
  rates: RollResult[] = [],
): {
  rate: number
  type: RESULT_ROLL_TYPE
} => {
  let rate = 0
  let type = RESULT_ROLL_TYPE.NOTHING
  const numbers = getRateNumberArr(rates)
  const total = numbers.reduce((a, b) => a + b, 0)

  if (total && (total === 1 || total === 100)) {
    const sorted = [...numbers].sort((a, b) => b - a)
    const d = Math.random()
    let p = 0
    let rate = 0
    for (let i = 0; i < sorted.length; i++) {
      const sort = sorted[i]
      const percent = total === 1 ? sort : sort / 100
      p = p + percent
      if (d < p) {
        rate = sort
        type = getTypeByRate(rates, rate)
        break
      }
    }
    return { rate, type }
  }
  return { rate, type }
}
