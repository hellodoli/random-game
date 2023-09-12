import { combineReducers } from "redux";
import baseReducer from "./base";

const rootState = {
  base: baseReducer
};

const createReducer = (injectedReducers = {}) => {
  const rootReducer = combineReducers({
    ...injectedReducers,
    // other non-injected reducers can go here...
    ...rootState
  });

  return rootReducer;
};

export { createReducer };
