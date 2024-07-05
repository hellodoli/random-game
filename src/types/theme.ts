export interface MapCssProp {
  [key: string]: string
}

export interface GlobalMapCssProp {
  [key: string]: MapCssProp
}

export interface GetMapCss {
  global?: boolean
  colorsGlobal?: boolean
  colorsGradient?: boolean
}
