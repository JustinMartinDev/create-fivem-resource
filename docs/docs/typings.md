---
id: typings
title: Typings
---

We use [Typescript](https://www.typescriptlang.org/) 5.5. The sub-packages `client` and `server` use official FiveM typing lib `@citizenfx/client` and `@citizenfx/server`.

## Typings already existing resource

You can create type for already existing resource **event they are not in Typescript**.

As exemple, with default `txData` server, a resource `spawnmanager` wrote in lua provide method to manage player spawn. You can create sub-package `types` inside `spawnmanager` folder.

Folder structure :

```
[managers]
├── spawnmanager
│ ├── spawnmanager.lua
│ ├── fxmanifest.lua
│ ├── types
│ │ ├── package.json
│ │ ├── exports.d.ts
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

<Tabs>
  <TabItem value="package.json" label="package.json" default>
    ```json
    {
      "name": "@spawnmanager/types",
      "version": "1.0.0",
      "devDependencies"": {
        "typescript": "catalog:"
      },
      "engines"": {
        "node": ">=18",
        "pnpm": ">=9.5"
      }
    }
    ```
  </TabItem>
  <TabItem value="exports.d.ts" label="exports.d.ts">
    ```ts
    /**
    * Type of method and const exported by client and server package
    */
    export type SpawnmanagerExports = {
      client: {
        spawnPlayer: (
          spawnParams: {x: number; y: number; z: number, model: string},      
          callback: Function
        ) => void
        setAutoSpawn: (enabled: boolean) => void;
        setAutoSpawnCallback: (
          callback: Function
        ) => void;
        forceRespawn: () => void
      }
    }
    ```
  </TabItem>
</Tabs>

## Typings of `exports`

In each resource sub-packages (`client` or `server`) you can use `global.d.ts` to type the global variable `exports`.
You can create type for already existing resource **event they are not in Typescript**

The idea is to define `exports` type with dependent resource.
As exemple if you use the txData resource `spawnmanager` you will have a `global.d.ts` like that

```ts title="global.d.ts"
import { SpawnmanagerExports } from "@spawnmanager/types";

declare var exports: {
  spawnmanager: SpawnmanagerExports;
};
```
