export interface GradientColorFromTo {
  FROM: string
  TO: string
}

export interface GradientColorSet {
  [key: string]: GradientColorFromTo
}
