import React from 'react'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { GAME_TYPE } from 'types/enum'
import { gameSelector } from 'selectors'
import { PercentGame, MainMenu, Modals } from './modules'

function App() {
  const game = useSelector(gameSelector)
  const renderGameModule = () => {
    switch (game) {
      case GAME_TYPE.PERCENT:
        return <PercentGame />
      default:
        return null
    }
  }
  return (
    <div className="App main">
      <Modals />
      <Toaster />
      <MainMenu />
      {/* Module games */}
      {renderGameModule()}
    </div>
  )
}

export default App
