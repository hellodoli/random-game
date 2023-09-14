import { Modal } from './data'

export interface ModalState {
  shows: string[]
  modals: {
    [key: string]: Modal
  }
}
