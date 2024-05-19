import { getDispatch } from 'utils/reduxStore'
import { modalActions } from './slices'
import { MODAL_EXTRA_PROPS_DEFAULT } from './constants'
import { ListModalNameArr, ListModalNameOb } from './types'

export const showModal = (type: string) => {
  return (modalExtraProps = MODAL_EXTRA_PROPS_DEFAULT) => {
    const dispatch = getDispatch()
    const modal = { type, modalExtraProps }
    dispatch(modalActions.showModal({ modal }))
  }
}

export const getMergeModalName = (
  moduleName = 'MODAL_DEFAULT',
  listModalName: string[] = [],
) => {
  const listNameArr: ListModalNameArr = []
  const listNameOb: ListModalNameOb = {}

  listModalName.forEach((name) => {
    const modalName = `${moduleName}__${name}`.toUpperCase()
    listNameArr.push(modalName)
    listNameOb[name.toUpperCase()] = modalName
  })

  return {
    listNameArr,
    listNameOb,
    list: {
      [moduleName.toUpperCase()]: listNameOb,
    },
  }
}
