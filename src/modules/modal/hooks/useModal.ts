import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsOpen } from '../selectors'
import { modalActions } from '../slices'

const useModal = (type: string) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen(type))

  const onClose = useCallback(() => {
    dispatch(modalActions.hideModal({ type }))
  }, [type])

  return { isOpen, onClose }
}

export default useModal
