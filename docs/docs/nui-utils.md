---
id: nui-utils
title: Utils
sidebar_label: Utils
---

## Utils

Our Nui templates includes somes utils methods to communicate with fivem resource client-side.

### useNuiEvent hook

`useNuiEvent` is a hook designed to intercept and handle messages dispatched by the game scripts. This is the primary way of creating passive listeners.

Note: For now handlers can only be registered a single time. I haven't come across a personal usecase for a cascading event system

```ts
const MyComp: React.FC = () => {
  const [state, setState] = useState("");

  useNuiEvent<string>("myAction", (data) => {
    // the first argument to the handler function
    // is the data argument sent using SendReactMessage

    // do whatever logic u want here
    setState(data);
  });

  return (
    <div>
      <h1>Some component</h1>
      <p>{state}</p>
    </div>
  );
};
```

### fetchNui

`fetchNui` is a simple NUI focused wrapper around the standard fetch API. This is the main way to accomplish active NUI data fetching or to trigger NUI callbacks in the game scripts.

When using this, you must always at least callback using {} in the gamescripts.

This can be heavily customized to your use case

```ts
// First argument is the callback event name.
fetchNui<ReturnData>("getClientData")
  .then((retData) => {
    console.log("Got return data from client scripts:");
    console.dir(retData);
    setClientData(retData);
  })
  .catch((e) => {
    console.error("Setting mock data due to error", e);
    setClientData({ x: 500, y: 300, z: 200 });
  });
```

### Visibility management

The `react` and `vue` templates include system to manage visibility of Nui frame.

You can display the frame by sending message to NUI from client-side

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

<Tabs>
  <TabItem value="react" label="react" default>
    ```ts
      sendReactMessage("setVisible", true)
    ```

    After it will be intercepted in `VisibilityProvider` by `useNuiEvent`. It will set the `iframe` the css property `visibility` to `visible`

  </TabItem>
  <TabItem value="vue" label="vue">
    ```ts
      sendVueMessage("setVisible", true)
    ```

    After it will be intercepted in `VisibilityProvider` by `useNuiEvent`. It will set the `iframe` the css property `visibility` to `visible`

  </TabItem>
</Tabs>
