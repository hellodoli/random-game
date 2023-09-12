import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { OnMouseEnterPrize, OnMouseLeavePrize } from '../types'
import { actions } from '../slices'

let timeout: NodeJS.Timeout
const time = 0

const useActions = () => {
  const dispatch = useDispatch()

  const onMouseEnter: OnMouseEnterPrize = useCallback((prize) => {
    clearTimeout(timeout)
    dispatch(actions.hoverPrize({ prize }))
  }, [])

  const onMouseLeave: OnMouseLeavePrize = useCallback(() => {
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
