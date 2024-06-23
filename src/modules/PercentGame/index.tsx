import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSlice } from './slices/useSlice'
import { actions } from './slices'
import { showModalInfo } from 'modules/PercentGame/utils'

import Header from './components/Header'
import RollAction from './components/RollAction'
import TrackMousePointer from './components/TrackMousePointer'
import Menu from './components/Menu'
import StartInfo from './components/Guide/StartInfo'
import ThemeEdit from './components/ThemeEdit'

import './style.scss'

const PercentGame = () => {
  useSlice()
  const dispatch = useDispatch()
  useEffect(() => {
    // show initial info
    showModalInfo({
      title: 'Hi! You will receive these items when start:',
      content: <StartInfo />,
      centered: true,
    })
    return () => {
      dispatch(actions.resetState())
    }
  }, [])
  return (
    <div className="game-module game-module-percent-game">
      <div className="game-module-percent-game-wrapper h-full relative">
        <ThemeEdit />
        <div className="game-module-wrapper section-border">
          <TrackMousePointer />
          <Header />
          <Menu />
          <RollAction />
        </div>
      </div>
    </div>
  )
}

export default PercentGame
