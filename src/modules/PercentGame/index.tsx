import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSlice } from './slices/useSlice'
import { actions } from './slices'
import { showModalInfo } from 'modules/PercentGame/utils'
import { getLocalStorage, STORAGE_KEYS } from 'utils/storages'

import Header from './components/Header'
import RollAction from './components/RollAction'
import TrackMousePointer from './components/TrackMousePointer'
import Menu from './components/Menu'
import StartInfo from './components/Guide/StartInfo'
import ThemeEditButton from './components/ThemeEditButton'

import './style.scss'

const PercentGame = () => {
  useSlice()
  const dispatch = useDispatch()
  useEffect(() => {
    // show initial info
    const key = STORAGE_KEYS.IS_HIDE_START_GAME_INFO_FOREVER
    const isHide = getLocalStorage(key)
    if (!isHide) {
      showModalInfo({
        title: 'Hi! You will receive these items when start:',
        content: <StartInfo />,
        centered: true,
      })
    }
    return () => {
      dispatch(actions.resetState())
    }
  }, [])
  return (
    <div className="game-module game-module-percent-game">
      <div className="game-module-percent-game-wrapper h-full relative">
        <ThemeEditButton />
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
