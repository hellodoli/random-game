import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from 'modules/PercentGame/slices'

const Worker = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(actions.resetMetaState())
    }
  }, [])
  return null
}

export default Worker
