import React, { useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from 'antd'
import { slotsSelector } from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import { getIconPrize } from 'modules/PercentGame/utils'
import { getMerge } from 'modules/PercentGame/utils/merge'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import Preview from '../Preview'

interface Props {
  iconSize: number
  gap: number
}

const ItemHolder = ({ iconSize, gap }: Props) => (
  <div
    className="game-prize-item game-prize-item--holder"
    style={{ margin: `${gap}px` }}
  >
    <div style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
  </div>
)

const Forge = ({ iconSize = 40, gap = 2 }: Props) => {
  const dispatch = useDispatch()
  const slots = useSelector(slotsSelector)
  const [loading, setLoading] = useState(false)
  const { isMerge, rate, randomMergeResult, resultPrizeWhenMergeSameIcon } =
    useMemo(() => getMerge(slots), [slots])
  const maxWidth = (iconSize + 8 + gap * 2) * 2
  const isEnable = isMerge
  const disabled = !isEnable || loading

  const clearAnimationToast = () => {
    const toaster = document.getElementById('forgeToaster')
    if (toaster) {
      toaster.classList.remove('animate__fadeInUp')
      toaster.classList.remove('text-success')
      toaster.classList.remove('text-fail')
      toaster.innerHTML = ''
    }
  }

  const showToastAfterMerge = (isSuccess: boolean) => {
    const toaster = document.getElementById('forgeToaster')
    if (toaster) {
      toaster.innerHTML = isSuccess ? 'Success!!' : 'Fail!!'
      toaster.classList.add('animate__fadeInUp')
      toaster.classList.add(`text-${isSuccess ? 'success' : 'fail'}`)
    }
  }

  const onUnselectPrize = useCallback((id: string) => {
    dispatch(actions.unSelectPrizeForRefining({ id }))
  }, [])

  const onMerge = () => {
    if (loading) return
    setLoading(true)
    const cb = (isSuccess: boolean) => {
      setLoading(false)
      showToastAfterMerge(isSuccess)
    }
    dispatch(
      actions.mergeRefining({
        rate,
        randomMergeResult,
        resultPrizeWhenMergeSameIcon,
        cb,
      }),
    )
  }

  return (
    <>
      <div className="forge-wrapper" style={{ maxWidth: `${maxWidth}px` }}>
        {slots.map((slot, index) => {
          if (!slot)
            return <ItemHolder key={index} iconSize={iconSize} gap={gap} />
          const prize = slot
          return (
            <PrizeItem
              key={prize.id}
              {...prize}
              icon={getIconPrize(prize.iconId)}
              iconSize={iconSize}
              gap={gap}
              isHoverView={false}
              isShowNumber={false}
              onClick={onUnselectPrize}
            />
          )
        })}
      </div>
      <div className="forge-action">
        <Preview
          rate={rate}
          isMerge={isMerge}
          randomMergeResult={randomMergeResult}
          slots={slots}
          resultPrizeWhenMergeSameIcon={resultPrizeWhenMergeSameIcon}
        />
        <Button
          type="primary"
          className={clsx({
            'is-disable': disabled,
          })}
          disabled={disabled}
          style={{
            marginTop: 20,
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
            height: 60,
            border: 'none',
            borderRadius: 40,
            background: !disabled
              ? 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'
              : 'rgba(0, 0, 0, 0.45)',
            boxShadow:
              'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
          }}
          block
          onClick={onMerge}
        >
          Merge
        </Button>
      </div>
      <div className="forge-toast">
        <span
          id="forgeToaster"
          className="forge-toast-text animate__animated animate__fast"
          onAnimationEnd={clearAnimationToast}
        ></span>
      </div>
    </>
  )
}

export default Forge
