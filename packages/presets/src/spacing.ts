import { defineTokens } from "@pandacss/dev";
import { space } from "warrrui-test-tokens";

export const spacing = defineTokens.spacing({
  xs: { value: space.xs },
  sm: { value: space.sm },
  md: { value: space.md },
  lg: { value: space.lg },
  xl: { value: space.xl },
});
