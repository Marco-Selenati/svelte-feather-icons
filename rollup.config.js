import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    typescript(),
    svelte({
      preprocess: autoPreprocess(),
    }),
    resolve({
      dedupe: ["svelte"],
    }),
    terser(),
  ],
};
