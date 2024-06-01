import { defineTokens, defineSemanticTokens } from "@pandacss/dev";
import { color } from "warrrui-test-tokens";

export const colors = defineTokens.colors({
  blue100: { value: color.blue100 },
  blue200: { value: color.blue200 },
  blue300: { value: color.blue300 },
  blue400: { value: color.blue400 },
  blue500: { value: color.blue500 },
  green100: { value: color.green100 },
  green200: { value: color.green200 },
  green300: { value: color.green300 },
  green400: { value: color.green400 },
  green500: { value: color.green500 },
  red100: { value: color.red100 },
  red200: { value: color.red200 },
  red300: { value: color.red300 },
  red400: { value: color.red400 },
  red500: { value: color.red500 },
  white: { value: color.white },
  black: { value: color.black },
});

export const semanticColors = defineSemanticTokens({
  colors: {
    primary: { value: color.primary },
    success: { value: color.success },
    error: { value: color.error },
  },
});
