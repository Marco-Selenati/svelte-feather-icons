import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    svelte({
      preprocess: autoPreprocess(),
    }),
    resolve({
      dedupe: ["svelte"],
    }),
  ],
};
