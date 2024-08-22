---
id: folder-structure
title: Folder Structure
---

## Lua folder structure

After creation, your Lua resource should look like this:

```
my-res/
  README.md
  client/
    client.lua
  server/
    server.lua
  web/
    package.json
    src/
      App.(tsx|vue)
```

The `web` sub-folder exist only if you choose the Nui option.

## Javascript/Typescript folder structure

After creation, your Javascript/Typescript resource should look like this:

```
my-res/
  README_res.md
  client/
    src/
      index.ts
    package.json
    rollup.config.mjs
  server/
    src/
      index.ts
    package.json
    rollup.config.mjs
  types/
    exports.d.ts
    package.json
  web/
    package.json
    src/
      App.(tsx|vue)
```

The `web` sub-folder exist only if you choose the Nui option.

For the resource building we use [Rollup](https://rollupjs.org/) to create bundle of `index.(ts|js)` files, **these bundle will be stored in `dist` folder and loaded by FiveM using `fxmanifest.lua`**:
