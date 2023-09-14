import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSlice } from './slices/useSlice'
import { actions } from './slices'

import Header from './components/Header'
import RollAction from './components/RollAction'
import TrackMousePointer from './components/TrackMousePointer'
import Menu from './components/Menu'

import './style.scss'

const PercentGame = () => {
  useSlice()
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(actions.resetState())
    }
  }, [])
  return (
    <div className="game-module game-module-percent-game">
      <div className="game-module-wrapper section-border">
        <TrackMousePointer />
        <Header />
        <Menu />
        <RollAction />
      </div>
    </div>
  )
}

export default PercentGame
