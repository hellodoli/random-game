import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsOpen, selectModalExtraProps } from '../selectors'
import { modalActions } from '../slices'

const useModal = (type: string) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectIsOpen(type))
  const modalExtraProps = useSelector(selectModalExtraProps(type))

  const onClose = useCallback(() => {
    dispatch(modalActions.hideModal({ type }))
  }, [type])

  return { isOpen, onClose, modalExtraProps }
}

export default useModal
