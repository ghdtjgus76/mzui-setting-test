import { defineTextStyles } from "@pandacss/dev";
import { typography } from "warrrui-test-tokens";

export const textStyles = defineTextStyles({
  h1: { value: typography.h1 },
  h2: { value: typography.h2 },
});
