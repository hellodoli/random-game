import { useInjectReducer } from 'redux-injectors'
import { slice } from '../slices'

const useModalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer })
  return { actions: slice.actions }
}

export default useModalSlice
