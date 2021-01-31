import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: "umd",
      name,
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
