export interface GradientSet {
  FROM: string;
  TO: string;
}

export interface GradientColorSet {
  [key: string]: GradientSet;
}
