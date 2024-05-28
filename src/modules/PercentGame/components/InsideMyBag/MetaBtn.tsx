import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Button } from 'antd'
import { META_TYPE } from 'modules/PercentGame/types/enum'
import useTrackMouse from 'modules/PercentGame/hooks/useTrackMouse'

interface Props {
  type?: META_TYPE
  icon: React.ReactNode
  isActive?: boolean
  isDisabled?: boolean
  className?: string
  title?: string
  onClick: () => void
}

const Track = ({ icon: Icon }: { icon: React.ReactNode }) => {
  const { x, y, isShow } = useTrackMouse({
    offsetWidth: 20,
    isNotShowWhenInit: true,
  })

  useEffect(() => {
    const onDblClick = () => {
      // handle logic dbclick outside
    }
    window.addEventListener('dblclick', onDblClick)
    return () => {
      window.removeEventListener('dblclick', onDblClick)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        top: `${y}px`,
        left: `${x}px`,
        visibility: isShow ? 'visible' : 'hidden',
      }}
      className="game-item-pointer-view"
    >
      {Icon}
    </div>
  )
}

const MetaButton = (props: Props) => {
  const {
    type = META_TYPE.SELL,
    icon: Icon,
    isActive = false,
    isDisabled = false,
    className = '',
    title = '',
    onClick,
  } = props

  return (
    <>
      <Button
        type="primary"
        className={clsx(
          'btn-item btn-item-meta',
          `btn-item-meta--${type}`,
          className,
          {
            'is-active ring-4': isActive,
          },
        )}
        icon={Icon}
        onClick={onClick}
        title={title}
        disabled={isDisabled}
      />
      {isActive && <Track icon={Icon} />}
    </>
  )
}

export default MetaButton
