import { Shape, Gradient, GradientSet, Type } from "./enum/icon";

interface Props {
  type?: Type;
  width?: number;
  height?: number;
  size?: number;
  shape?: Shape;
  fill?: string; // color icon
  bgFill?: string; // full color bg
  dimension?: number;
  iconName?: string;
  // gradient optional
  gradient?: Gradient;
  gradientSet?: GradientSet;
  fromColor?: string;
  toColor?: string;
  // space
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;

  onClick?: () => void;
}

export interface GameIcon extends Props {
  classNames?: string;
}

export interface WrapperIcon extends Props {
  children?: React.ReactNode;
  classNames?: string;
}

export interface BackgroundShape extends Props {}

export interface BackgroundGradient extends Props {
  gradientId?: string;
}
