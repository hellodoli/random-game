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
        className="btn-linear btn-wide play-game-btn uppercase fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
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
          className="btn-outline back-to-btn fixed right-5 top-5 font-semibold leading-[28px] h-[28px]"
        >
          Back
        </Button>
      )}
      {!game ? renderGameButtons() : null}
    </>
  )
}

export default MainMenu
