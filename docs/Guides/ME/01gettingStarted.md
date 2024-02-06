---
title: Getting Started
description: How to get ME and run your scripts
---

import React from 'react';
import ContentBlock from '@site/src/components/ContentBlock';
import BrowserWindow from '@site/src/components/BrowserWindow';

:::hidden
## Acquiring
:::

<ContentBlock title="Acquiring">
Get the latest release build from the MemoryError discord <u>[**bot-release**](https://discord.com/channels/809828167015596053/1094154063702147122)</u> channel.
</ContentBlock>

:::hidden
## Setup
:::

<ContentBlock title="Setup">
<BrowserWindow url="https://discord.com/channels/809828167015596053/1094154063702147122">

- Extract the archive.
- Copy the `Lua_Scripts` folder to `%userprofile%\Documents\MemoryError\Lua_Scripts`.
- Start/already have RuneScape running.
- Launch `BasicInjector.exe` from the extracted archive.
- Wait for the dll to be injected. (you should see a debug bar at top left of your screen when it's injected)

    > ![Debug bar](debug_bar.png)

:::info
    The `MemoryError.dll` and `BasicInjector.exe` can go anywhere, they need to be together in the same folder.
:::

</BrowserWindow>
</ContentBlock>

:::hidden
## FAQ
:::

<ContentBlock title="FAQs">
- #### ME isn't running? What am I doing wrong?
    > - Make sure that you aren't running Runescape under compatibility mode.
    >
    > - Windows might have quarantined your dll.
---
- #### Why is the script throwing errors? Something about api missing?
    > - Make sure you are running the latest version of `MemoryError`. You can verify this by looking at the window title.
    >
    >   ![ME version](me_version.png)
    >
    > - Make sure that you have the latest `api.lua` file in your `Lua_Scripts` folder located at `%userprofile%\Documents\MemoryError\Lua_Scripts`.
    >
    > - If you are using any utility files, make sure they are also in your `Lua_Scripts` folder.
---
- #### Where can I find scripts to run?

    > - You can find the scripts and libraries I've authored right here on this website.
    >   - <u>[**Scripts**](/category/scripts)</u>
    >   - <u>[**Libraries**](/category/libraries)</u>
---
    > - You can find published scripts on the <u>[**Scripts**](https://discord.com/channels/809828167015596053/1137308245439041648)</u> channel on the MemoryError discord.

<details>
<summary>Warning about Discord Scripts</summary>
:::danger Discord Scripts
**The published scripts on `Discord` are neither curated nor moderated**.

**Always read through and verify every script before you run it for your own safety**.
:::
</details>

---
- #### How do I know what arguments to pass to functions?
    > - You can refer to `api.lua` and `usertypes.lua` to find the structs that the `sol2` bindings support.
---
</ContentBlock>