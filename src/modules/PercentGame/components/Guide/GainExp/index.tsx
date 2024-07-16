import React, { useCallback } from 'react'
import { Space, Button } from 'antd'
import { AnvilImpact, Ticket } from 'components/Icons/Game'
import {
  openModalRefining,
  openModalRoll,
} from 'modules/PercentGame/utils/modal'
interface Props {
  closeModal?: () => void
}

const Item = ({
  title = '',
  subTitle = '',
  children,
}: {
  title?: string
  subTitle?: string
  children?: React.ReactNode
}) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 min-w-14 font-semibold">{title}</span>
      {subTitle ? (
        <>
          <br />
          <span className="mr-2 min-w-14">{subTitle}</span>
        </>
      ) : null}
      <span className="flex items-center">{children}</span>
    </div>
  )
}

const GainExp = ({ closeModal }: Props) => {
  const handleOpenRefining = useCallback(() => {
    openModalRefining()
    closeModal?.()
  }, [])

  const handleOpenRoll = useCallback(() => {
    openModalRoll()
    closeModal?.()
  }, [])

  return (
    <Space direction="vertical" size="middle" className="w-full">
      <Item title="1. Merge:">
        <>
          <span className="mr-1">(</span>
          <Button
            type="primary"
            className="btn-item btn-item-action"
            icon={<AnvilImpact size={24} />}
            title="Merge (Refining)"
            onClick={handleOpenRefining}
          />
          <span className="ml-1">)</span>
        </>
      </Item>
      <Item title="2. Roll (receive exp after get a reward):">
        <>
          <span className="mr-1">(</span>
          <Button
            type="primary"
            className="btn-item btn-item-action"
            icon={<Ticket size={24} />}
            title="Roll"
            onClick={handleOpenRoll}
          />
          <span className="ml-1">)</span>
        </>
      </Item>
    </Space>
  )
}

export default GainExp
