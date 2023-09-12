import { AnyAction } from "@reduxjs/toolkit";
import { GAME_TYPE } from "types/enum";

type Game = null | GAME_TYPE;

export interface BaseState {
  appName: string;
  author: string;
  game: Game;
}

export const initialState: BaseState = {
  appName: "Game",
  author: "HD",
  game: null
};

const baseReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "GLOBAL_SWITCH_GAME": {
      const game = action?.payload?.game as Game;
      return {
        ...state,
        game
      };
    }
    default:
      return state;
  }
};

export default baseReducer;
