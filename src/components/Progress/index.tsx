import React, { useMemo, memo } from 'react'
import clsx from 'clsx'
import { Progress as AntdProgress } from 'antd'
import './style.scss'

interface Props {
  percent?: number
  fromColor?: string
  toColor?: string
  status?: 'normal' | 'exception' | 'active' | 'success'
  showInfo?: boolean
  offTransition?: boolean
  strokeWidth?: number
}

const Progress = ({
  percent = 0,
  fromColor = 'var(--color-gradient-1-start)',
  toColor = 'var(--color-gradient-1-end)',
  status = 'active',
  showInfo = true,
  offTransition = false,
  strokeWidth = 16,
}: Props) => {
  const strokeColor = useMemo(
    () => ({
      from: fromColor,
      to: toColor,
    }),
    [fromColor, toColor],
  )
  const size = useMemo<[number, number]>(() => [0, strokeWidth], [strokeWidth])
  return (
    <div
      className={clsx('progress-wrapper', {
        'transition-none': offTransition,
      })}
    >
      <AntdProgress
        percent={percent}
        strokeColor={strokeColor}
        status={status}
        showInfo={showInfo}
        size={size}
      />
    </div>
  )
}

export default memo(Progress)
