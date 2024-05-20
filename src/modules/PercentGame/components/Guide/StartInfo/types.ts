import { GameIcon } from 'components/Icons/types'

export interface GameStartInfo {
  id: string
  icon: (props: GameIcon) => JSX.Element
  title: string
  value: number
}
