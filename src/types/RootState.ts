import { BaseState } from "../reducers/base";

import { PercentGameState } from "../modules/PercentGame/types";

export interface RootState {
  base?: BaseState;
  percentGame?: PercentGameState;
}
