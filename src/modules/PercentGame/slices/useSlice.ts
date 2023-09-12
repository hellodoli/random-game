import { useInjectReducer /*useInjectSaga*/ } from "redux-injectors";
import { slice } from "./";

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  // useInjectSaga({ key: slice.name, saga })
  return { actions: slice.actions };
};
