import React, { useState, useCallback, memo, useRef } from 'react'
import { SketchPicker, ColorChangeHandler } from 'react-color'

interface Props {
  initColor: string
  pro: string
  setIsDirty: (isDirty: boolean) => void
  applyThemeColor: (pro: string, color: string) => void
}

const styles = {
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
  },
}

const OnClosePopover = ({ onHandleClose }: { onHandleClose: () => void }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      }}
      onClick={onHandleClose}
    />
  )
}

const PickColor = ({ initColor, pro, setIsDirty, applyThemeColor }: Props) => {
  const [colorHex, setColorHex] = useState(initColor)
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const timeout = useRef<string | number | NodeJS.Timeout | undefined>()

  const onHandleClickToggle = () => {
    setDisplayColorPicker((toggle) => !toggle)
  }

  const onHandleClose = useCallback(() => {
    setDisplayColorPicker(false)
  }, [])

  const handleChangeColor: ColorChangeHandler = useCallback(
    (color) => {
      const colorHex = color.hex
      const colorRGBA = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${
        color.rgb?.a || 1
      })`
      const colorPick = color.rgb?.a === 1 ? colorHex : colorRGBA
      if (colorHex !== initColor) {
        setColorHex(colorPick)
        setIsDirty(true)
        clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
          applyThemeColor(pro, colorPick)
        })
      }
    },
    [pro, applyThemeColor],
  )

  return (
    <div>
      <div style={styles.swatch} onClick={onHandleClickToggle}>
        <div style={{ ...styles.color, background: colorHex }}></div>
      </div>
      {displayColorPicker ? (
        <div style={{ position: 'absolute', zIndex: 2 }}>
          <OnClosePopover onHandleClose={onHandleClose} />
          <SketchPicker color={colorHex} onChange={handleChangeColor} />
        </div>
      ) : null}
    </div>
  )
}

export default memo(PickColor)
