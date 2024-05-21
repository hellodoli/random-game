import React from 'react'
import { Slots, Prize } from 'modules/PercentGame/types'
import { getIconPrize } from 'modules/PercentGame/utils'
import {
  getNextGradientSet,
  getPrizeFromSlot,
} from 'modules/PercentGame/utils/merge'
import { PerspectiveDice6FacesRandom } from 'components/Icons/Game'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import SlotHolder from '../SlotHolder'

interface Props {
  isMerge?: boolean
  randomMergeResult?: boolean
  resultPrizeWhenMergeSameIcon?: Prize | null
  rate: number
  slots: Slots
}

const Preview = ({
  slots,
  rate,
  isMerge = false,
  randomMergeResult = false,
  resultPrizeWhenMergeSameIcon = null,
}: Props) => {
  const successRate = isMerge ? `${rate * 100}%` : ''

  const renderPreviewItem = () => {
    if (!isMerge) return <SlotHolder iconSize={60} gap={0} />
    const prize = randomMergeResult
      ? getPrizeFromSlot(slots[0])
      : !randomMergeResult && resultPrizeWhenMergeSameIcon
      ? resultPrizeWhenMergeSameIcon
      : null

    if (!prize) return null

    return (
      <PrizeItem
        {...prize}
        icon={
          randomMergeResult
            ? PerspectiveDice6FacesRandom
            : getIconPrize(prize.iconId)
        }
        iconSize={60}
        gradientSet={getNextGradientSet(prize.gradientSet)}
        isHoverView={false}
        isShowNumber={false}
      />
    )
  }

  const renderIconPreviewName = () => {
    if (!isMerge) return ''
    if (randomMergeResult) return '<??????>'
    const slot = slots[0]
    if (!slot) return ''
    return `<${slot.iconName}>`
  }

  return (
    <div className="forge-preview">
      <div className="flex-none">{renderPreviewItem()}</div>
      <div className="preview-info">
        <p className="preview-name">
          <span className="label">Name:</span>
          <span className="icon-preview-name">{renderIconPreviewName()}</span>
        </p>
        <p className="preview-rate">
          <span className="label">% Success:</span>
          <span className="rate">{successRate}</span>
        </p>
      </div>
    </div>
  )
}

export default Preview
