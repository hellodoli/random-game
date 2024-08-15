import { useEffect, useMemo, useState } from 'react'
import type { TrackMouseOptions } from 'modules/PercentGame/types/trackMouse'
import { DEFAULT_TRACK_MOUSE_OPTIONS as dfProps } from 'modules/PercentGame/constants'

const useTrackMouse = (props: TrackMouseOptions = dfProps) => {
  const {
    isNotShowWhenInit = dfProps.isNotShowWhenInit,
    offsetY = dfProps.offsetY,
    offsetX = dfProps.offsetX,
    offsetWidth = dfProps.offsetWidth,
  } = props
  const [mounted, setMounted] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const isShow = useMemo(() => {
    return isNotShowWhenInit ? !!(x !== 0 && y !== 0 && mounted) : true
  }, [isNotShowWhenInit, x, y, mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const track = (event: { clientY: number; clientX: number }) => {
      if (offsetWidth === 0) return

      const maxWidth = window.innerWidth
      const containerWith = offsetWidth + offsetX
      let x = event.clientX
      if (x + containerWith >= maxWidth) {
        x -= containerWith
      } else {
        x += offsetX
      }
      setX(x)
      setY(event.clientY + offsetY)
    }
    window.addEventListener('mousemove', track)
    return () => {
      window.removeEventListener('mousemove', track)
    }
  }, [offsetWidth, offsetY, offsetX, isNotShowWhenInit])

  return { isShow, x, y }
}

export default useTrackMouse
