import React, { memo } from 'react'
import { Button } from 'antd'

interface Props {
  activeNav: number
  setActiveNav: (activeNav: number) => void
  resetDefault: () => void
}

const navButtons = [
  { id: 1, text: 'global colors' },
  { id: 2, text: 'gradient colors' },
]

const NavButtons = ({ activeNav, resetDefault, setActiveNav }: Props) => {
  return (
    <div className="lg:-m-1">
      <Button
        type="text"
        className="uppercase w-full lg:w-auto lg:m-1 mt-2"
        onClick={resetDefault}
      >
        Reset to default
      </Button>
      {navButtons.map(({ id, text }) => {
        const isActive = activeNav === id
        return (
          <Button
            key={id}
            type="primary"
            className={`${
              isActive ? 'btn-linear' : 'btn-outline'
            } uppercase w-full lg:w-auto lg:m-1 mt-2`}
            style={{ ...(isActive && { color: '#fff' }) }}
            onClick={() => setActiveNav(id)}
          >
            {text}
          </Button>
        )
      })}
    </div>
  )
}

export default memo(NavButtons)
