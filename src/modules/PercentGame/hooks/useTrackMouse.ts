import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_TRACK_MOUSE_OPTIONS as defaultProps } from 'modules/PercentGame/constants'

interface Props {
  offsetWidth?: number
  isNotShowWhenInit?: boolean
}

const useTrackMouse = (props: Props = defaultProps) => {
  const {
    offsetWidth = defaultProps.offsetWidth,
    isNotShowWhenInit = defaultProps.isNotShowWhenInit,
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
      const threshold = 12
      const windowWidth = window.innerWidth
      const containerWidth = offsetWidth
      const y = event.clientY + threshold
      let x = event.clientX
      const containerWithT = containerWidth + threshold
      if (x + containerWithT >= windowWidth) {
        x -= containerWithT
      } else x += threshold
      setX(x)
      setY(y)
    }
    window.addEventListener('mousemove', track)
    return () => {
      window.removeEventListener('mousemove', track)
    }
  }, [offsetWidth, isNotShowWhenInit])

  return { isShow, x, y }
}

export default useTrackMouse
