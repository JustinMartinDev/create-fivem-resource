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
  README.md
  client/
    src/
      client.entry.ts
    package.json
    rollup.config.js
  server/
    src/
      server.entry.ts
    package.json
    rollup.config.js
  types/
    index.d.ts
    package.json
  web/
    package.json
    src/
      App.(tsx|vue)
```

The `web` sub-folder exist only if you choose the Nui option.

For the resource building we use [Rollup](https://rollupjs.org/) to create bundle of `.entry.(ts|js)` files, **these bundles will be stored in `dist` folder and loaded by FiveM using `fxmanifest.lua`**:
