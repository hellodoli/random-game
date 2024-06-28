import React, { useState, useEffect, memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { GradientSetColorFromTo } from 'types/enum/color'
import {
  isRollingSelector,
  ticketSelector,
} from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { DEFAULT_LIST_ROLL_BTN } from 'modules/PercentGame/constants'
import { RollResult } from 'modules/PercentGame/types'

import { Space } from 'antd'
import RollItem from './RollItem'
import RollGuide from './RollGuide'
import PrizePickUp from './PrizePickUp'
import RollProgress from './RollProgress'
import './style.scss'

let flag = false
let intervalProgress: string | number | NodeJS.Timeout | undefined
const clearProgressInterval = () => {
  clearInterval(intervalProgress)
}

interface Props {
  isMirror?: boolean
}

const RollAction = ({ isMirror = false }: Props) => {
  const dispatch = useDispatch()
  const isRolling = useSelector(isRollingSelector)
  const ticket = useSelector(ticketSelector)

  const [progress, setProgress] = useState(0)
  const [isAnimate, setIsAnimate] = useState(false)
  const [rates] = useState(DEFAULT_LIST_ROLL_BTN)

  const onRoll = useCallback(
    (
      consume: number,
      count: number,
      rates: RollResult[],
      gradient: GradientSetColorFromTo,
    ) => {
      if (isRolling || isMirror) return
      flag = false
      dispatch(actions.startRoll({ consume, gradient })) // start rolling
      intervalProgress = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10
          if (newProgress > 100) {
            if (!flag) {
              flag = true
              // end roll
              dispatch(actions.endRoll({ count, consume, rates }))
            }
            clearProgressInterval()
            return prevProgress
          }
          return newProgress
        })
      }, 200)
    },
    [isRolling, isMirror],
  )

  useEffect(() => {
    if (!isRolling) {
      const proWrapp = document.getElementById('rateProWrapp')
      if (!proWrapp) {
        setProgress(0)
        return
      }
      /**
       * turn off transition when finish progress
       * then quickly turn on
       */
      proWrapp?.classList?.add('off-transition')
      setTimeout(() => setProgress(0))
      setTimeout(() => {
        proWrapp?.classList?.remove('off-transition')
        setIsAnimate(false)
        // timeout > time transition (time transition = 300)
      }, 310)
    } else {
      setIsAnimate(true)
    }
  }, [isRolling])

  useEffect(() => {
    return () => {
      flag = false
      clearProgressInterval()
    }
  }, [])

  return (
    <div className="game-rolling-area section-border">
      {!isMirror && <PrizePickUp />}
      {!isMirror && <RollGuide />}

      <div id="rateProWrapp" className="rate-progress">
        <RollProgress progress={progress} />
      </div>

      {/* Roll buttons */}
      <Space
        className="rolling-list"
        direction="vertical"
        style={{ width: '100%' }}
        wrap
      >
        {rates.map(({ id, rates, rollType, consume }) => {
          const disabled = isMirror
            ? false
            : isRolling || isAnimate || !ticket || !!(ticket < consume)
          return (
            <RollItem
              key={id}
              id={id}
              rates={rates}
              rollType={rollType}
              consume={consume}
              count={Math.floor(ticket / consume)}
              disabled={disabled}
              onRoll={onRoll}
            />
          )
        })}
      </Space>
    </div>
  )
}

export default memo(RollAction)
