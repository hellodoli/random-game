import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gameSelector } from 'selectors'
import { GAME_TYPE } from 'types/enum'

import { Button } from 'antd'

const defaultGame = GAME_TYPE.PERCENT

const MainMenu = () => {
  const dispatch = useDispatch()
  const game = useSelector(gameSelector)
  const switchGame = (game: null | GAME_TYPE) => {
    dispatch({
      type: 'GLOBAL_SWITCH_GAME',
      payload: { game },
    })
  }

  const renderGameButtons = () => {
    return (
      <Button
        type="primary"
        size="large"
        onClick={() => switchGame(defaultGame)}
        className="btn-linear btn-wide play-game-btn"
      >
        play
      </Button>
    )
  }

  return (
    <>
      {game && (
        <Button
          type="primary"
          size="large"
          onClick={() => switchGame(null)}
          className="btn-outline back-to-btn"
        >
          Back
        </Button>
      )}
      {!game ? renderGameButtons() : null}
    </>
  )
}

export default MainMenu
