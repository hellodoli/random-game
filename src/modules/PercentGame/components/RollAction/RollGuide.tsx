import React, { memo } from 'react'
import { Space } from 'antd'
import { Help as HelpIcon } from 'components/Icons/Game'
import { showModalInfo } from 'modules/PercentGame/utils'
import { DEFAULT_LIST_ROLL_BTN } from 'modules/PercentGame/constants'

const listRoll = DEFAULT_LIST_ROLL_BTN

const GuideText = () => {
  return (
    <div>
      <Space direction="vertical">
        {listRoll.map((roll) => {
          return (
            <div key={roll.id}>
              <span style={{ fontWeight: 'bold', marginRight: 4 }}>
                [{roll.rollType}]
              </span>
              <span>(</span>
              <>
                {roll.rates.map((rate, index) => {
                  return (
                    <span key={`${roll.id}${rate.type}`}>
                      <span>{`${rate.type}: ${rate.rate}%`}</span>
                      {index < roll.rates.length - 1 && <span>, </span>}
                    </span>
                  )
                })}
              </>
              <span>)</span>
            </div>
          )
        })}
      </Space>
    </div>
  )
}

const RollTitleGuide = () => {
  const onClick = () => {
    showModalInfo({
      content: <GuideText />,
    })
  }

  return (
    <div className="rate-title">
      <HelpIcon size={16} onClick={onClick} />
      <span>Choose your roll type:</span>
    </div>
  )
}

export default memo(RollTitleGuide)
