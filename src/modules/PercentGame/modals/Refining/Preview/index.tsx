import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GradientSet } from 'types'
import { Slots, Prize } from 'modules/PercentGame/types'
import { getIconPrize } from 'modules/PercentGame/utils'
import PrizeItem from 'modules/PercentGame/components/PrizeItem'
import { PerspectiveDice6FacesRandom } from 'components/Icons/Game'

interface Props {
  isMerge?: boolean
  randomMergeResult?: boolean
  resultPrizeWhenMergeSameIcon?: Prize | null
  rate: number
  slots: Slots
}

const ItemHolder = () => {
  return (
    <div className="game-prize-item game-prize-item--holder">
      <div style={{ width: 60, height: 60 }} />
    </div>
  )
}

const getGradientSetNext = (gradientSet: GradientSet) => {
  switch (gradientSet) {
    case GradientSet.BRONZE:
      return GradientSet.SILVER
    case GradientSet.SILVER:
      return GradientSet.GOLD
    case GradientSet.GOLD:
      return GradientSet.DIAMOND
    default:
      return gradientSet
  }
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
    if (!isMerge) return <ItemHolder />
    const prize =
      randomMergeResult && slots
        ? slots[0]
        : !randomMergeResult && resultPrizeWhenMergeSameIcon
        ? resultPrizeWhenMergeSameIcon
        : null

    if (!prize) return null
    return (
      <PrizeItem
        {...prize}
        id={uuidv4()}
        icon={
          randomMergeResult
            ? PerspectiveDice6FacesRandom
            : getIconPrize(prize.iconId)
        }
        iconSize={60}
        gradientSet={getGradientSetNext(prize.gradientSet)}
        isHoverView={false}
        isShowNumber={false}
      />
    )
  }

  const renderIconPreviewName = () => {
    if (!isMerge) return ''
    if (randomMergeResult) return '<??????>'
    const prize = slots[0]
    if (!prize) return ''
    return `<${prize.iconName}>`
  }

  return (
    <div className="forge-preview">
      <div style={{ flex: 'none' }}>{renderPreviewItem()}</div>
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
