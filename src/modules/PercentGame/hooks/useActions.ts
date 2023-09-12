import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Prize } from '../types'
import { actions } from '../slices'

let timeout: NodeJS.Timeout
let time = 0

const useActions = () => {
  const dispatch = useDispatch()

  const onMouseEnter = useCallback((prize: Prize | null) => {
    clearTimeout(timeout)
    dispatch(actions.hoverPrize({ prize }))
  }, [])

  const onMouseLeave = useCallback(() => {
    clearTimeout(timeout)
    const handle = () => {
      dispatch(actions.hoverPrize({ prize: null }))
    }
    timeout = setTimeout(handle, time)
  }, [])

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [])

  return {
    onMouseEnter,
    onMouseLeave,
  }
}

export default useActions
