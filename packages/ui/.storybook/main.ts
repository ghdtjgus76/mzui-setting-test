import type { StorybookConfig } from "@storybook/nextjs";

import path, { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/base-ui/**/*.mdx",
    "../src/base-ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/designed-ui/**/*.mdx",
    "../src/designed-ui/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async webpackFinal(config) {
    if (config?.resolve?.alias) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@styled-system": path.resolve(__dirname, "../styled-system"),
      };
    }
    return config;
  },
};
export default config;
