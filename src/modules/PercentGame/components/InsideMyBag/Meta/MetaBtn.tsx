import React, { useEffect, useRef, ReactNode } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'
import { META_TYPE } from 'modules/PercentGame/types/enum'
import useTrackMouse from 'modules/PercentGame/hooks/useTrackMouse'
import { actions } from 'modules/PercentGame/slices'

interface Props {
  type?: META_TYPE
  icon: React.ReactNode
  isActive?: boolean
  isDisabled?: boolean
  className?: string
  title?: string
  onClick: () => void
}

const Track = (props: {
  icon: ReactNode
  btnRef: React.RefObject<HTMLButtonElement>
}) => {
  const dispatch = useDispatch()
  const { icon: Icon, btnRef } = props
  const { x, y, isShow } = useTrackMouse({
    offsetWidth: 20,
    isNotShowWhenInit: true,
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClick = (e: any) => {
      const el = btnRef.current
      const target = e?.target
      if (el && !el.contains(target)) {
        dispatch(actions.clickOutsideWhenHasMetaAction())
      }
    }
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('click', onClick)
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
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Button
        ref={ref}
        type="primary"
        className={clsx(
          'btn-item btn-linear-1',
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
      {isActive && <Track icon={Icon} btnRef={ref} />}
    </>
  )
}

export default MetaButton
