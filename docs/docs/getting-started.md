---
id: getting-started
title: Getting Started
---

Create FiveM Resource is an unofficially supported way to create resource. It offers multiple options to create your resource like runtime and nui.

## Quick Start

```sh
npx create-fivem-resource
```

> If you've previously installed `create-fivem-resource` globally via `npm install -g create-fivem-resource`, we recommend you uninstall the package using `npm uninstall -g create-fivem-resource` or `yarn global remove create-fivem-resource` to ensure that `npx` always uses the latest version.

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

Then upadate your `server.cfg` to load `my-res` at start

```txt
ensure my-res
```

Then start your FXServer, and connect to it using FiveM client

<p align='center'>
<img src='/img/demo-cli-2.0.2.gif' width='600' alt='npm start' />
</p>

### Get Started Immediately

You **don’t** need to install or configure tools like webpack or Babel. If needed configuration are already set in `rollup.config.mjs`, `tsconfig.json` and `vite.json` so that you can focus on the code.

Create a resource, and you’re good to go.

## Creating a resource

**You’ll need to have Node >= 18**. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects. We recommend you to use the last LTS version

**You’ll need to have Pnpm >= 9.5**. You can install it following the instructions in [pnpm docs](https://pnpm.io/installation).

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-fivem-resource@latest
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

### npm

```sh
npm init fivem-resource
```

_`npm init <initializer>` is available in npm 6+_

### Yarn

```sh
yarn create fivem-resource
```

_`yarn create` is available in Yarn 0.25+_

### Selecting a template

You can now fill the questions asked by CLI to selecte and configure you template with the diffrents options.

Exemples of options :

- Runtime => Javascript/Lua/Typescript
- Nui => React/Vue

## Output

Running any of these commands will create a folder with the name of your resource. Inside that folder, it will generate the initial resource structure:

```
my-res
├── README_res.md
├── fxmanifest.lua
├── client
│   ├── ....
├── server
│   ├── ....
├── web
│   ├── ....
```

No configuration or complicated folder structures, only the files you need to build your resource. Once the installation is done, you can open your project folder:

```sh
cd my-res
```
