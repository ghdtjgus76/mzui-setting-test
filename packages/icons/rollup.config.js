import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import svgo from "rollup-plugin-svgo";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

process.env.BABEL_ENV = "production";

const baseConfig = {
  input: "./src/react/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "es",
    },
    {
      file: "./dist/index.cjs",
      format: "cjs",
    },
  ],
  external: ["react/jsx-runtime"],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: "node_modules/**",
    }),
    terser(),
    json(),
    babel({
      extensions,
      include: ["src/**/*"],
      babelHelpers: "runtime",
    }),
    url(),
    svgr(),
    svgo({
      multipass: false,
      datauri: "base64",
      js2svg: {
        indent: 2,
        pretty: true,
      },
      plugins: [
        "preset-default",
        "prefixIds",
        {
          name: "prefixIds",
          params: {
            prefix: "uwu",
          },
        },
      ],
    }),
  ],
};

export default baseConfig;
