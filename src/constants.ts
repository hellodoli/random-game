import { GradientColorSet } from "types/enum/color";

export const GRADIENT_COLOR_SET: GradientColorSet = {
  DIAMOND: {
    // #87d068 -> #ff4d82
    FROM: "var(--color-gradient-diamond-from)",
    TO: "var(--color-gradient-diamond-to)"
  },
  GOLD: {
    // #a67c00 -> #ffbf00
    FROM: "var(--color-gradient-gold-from)",
    TO: "var(--color-gradient-gold-to)"
  },
  SILVER: {
    // #afafaf -> #c0c2ce
    FROM: "var(--color-gradient-silver-from)",
    TO: "var(--color-gradient-silver-to)"
  },
  BRONZE: {
    // #cd8500 -> #a0522d
    FROM: "var(--color-gradient-bronze-from)",
    TO: "var(--color-gradient-bronze-to)"
  }
};
