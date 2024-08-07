import React, { useState, useEffect, memo, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
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
  isParallel?: boolean
  isMirror?: boolean
  isShowPrizePickUp?: boolean
}

const RollAction = ({
  isMirror = false,
  isShowPrizePickUp = false,
  isParallel = true,
}: Props) => {
  const dispatch = useDispatch()
  const isRolling = useSelector(isRollingSelector)
  const ticket = useSelector(ticketSelector)

  const [progress, setProgress] = useState(0)
  const [isAnimate, setIsAnimate] = useState(false)
  const [rates] = useState(DEFAULT_LIST_ROLL_BTN)
  const rateProWrapp = useRef<HTMLDivElement>(null)

  const onRoll = useCallback(
    (
      consume: number,
      count: number,
      rates: RollResult[],
      gradient: GradientSetColorFromTo,
    ) => {
      if (isRolling) return
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
    [isRolling],
  )

  useEffect(() => {
    if (!isRolling) {
      const proWrapp = rateProWrapp.current
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
    <div
      className={clsx('game-rolling-area section-border', {
        'is-mirror': isMirror,
        'is-parallel': isParallel,
      })}
    >
      {isShowPrizePickUp && <PrizePickUp />}
      <RollGuide />

      <div className="rate-progress" ref={rateProWrapp}>
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
          const disabled =
            isRolling || isAnimate || !ticket || !!(ticket < consume)
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
