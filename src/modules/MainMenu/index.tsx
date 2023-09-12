import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameSelector } from "selectors";
import { GAME_TYPE } from "types/enum";

import { Button } from "antd";

const defaultGame = GAME_TYPE.PERCENT;

const MainMenu = () => {
  const dispatch = useDispatch();
  const game = useSelector(gameSelector);
  const switchGame = (game: null | GAME_TYPE) => {
    dispatch({
      type: "GLOBAL_SWITCH_GAME",
      payload: { game }
    });
  };

  return (
    <>
      {game && (
        <Button
          type="primary"
          size="large"
          onClick={() => switchGame(null)}
          className="back-to-btn"
          ghost
        >
          Back
        </Button>
      )}
      {!game && (
        <Button
          type="primary"
          size="large"
          onClick={() => switchGame(defaultGame)}
          className="play-game-btn"
          ghost
        >
          play
        </Button>
      )}
    </>
  );
};

export default MainMenu;
