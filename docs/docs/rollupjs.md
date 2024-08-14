---
id: rollupjs
title: Rollup.js
---

We use [Rollup.js](https://rollupjs.org/) to generate bundles supported by FiveM client runtime.

## Bundles

Bundles are comptible with Node 16 (the version embeded in FiveM client), they are fully in CommonJS because the runtime is not compatible with `require` syntax.

The commands `pnpm build` and `pnpm watch` will generate a bundled file for each `*.entry.ts` or `*.entry.js` files. 

Theses bundles are stored in `dist` folder and loaded by FiveM with `client_scripts` and `server_scripts` properties inside `fxmanifest.lua`.

## Plugins

Our configuration use `@rollup/plugin-typescript`, `@rollup/plugin-commonjs` and `@rollup/plugin-node-resolve`, feel free to extend the configuration wil new plugins

## Configurations

```js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import glob from "fast-glob";

//find all file matching the pattern *.entry.tsc
const entryFiles = glob.sync("src/*.entry.ts");

if (entryFiles.length === 0) {
  throw new Error("No entry files found");
}

export default entryFiles.map((entryFile) => ({
  input: entryFile,
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: false,
  },
  plugins: [resolve(), typescript(), commonjs()],
}));
```
