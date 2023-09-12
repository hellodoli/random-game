import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "types";
import { initialState } from "reducers/base";

const selectSlice = (state: RootState) => state.base || initialState;

export const gameSelector = createSelector(selectSlice, (state) => state.game);
