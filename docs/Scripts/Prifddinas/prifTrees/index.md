---
title: Tree Chopper
description: Chops Trees in Prifddinas
slug: /dead-prif-trees
---

import React from 'react';
import TopBanner from '@site/src/components/TopBanner';
import ContentBlock from '@site/src/components/ContentBlock';
import Changelog from '@site/src/components/Changelog';
import BrowserWindow from '@site/src/components/BrowserWindow';
import changes from './changes.json'

<TopBanner title="Tree Chopper" version="2024.02.01" skill="Woodcutting">
</TopBanner>

:::hidden
## Requirements
:::
<ContentBlock title="Requirements">

- <u>[**Plague's End**](https://runescape.wiki/w/Plague%27s_End)</u> completed to access Prifddinas

</ContentBlock>

:::hidden
## Features
:::

<ContentBlock title="Features">

- Automatically teleports to Prifddinas lodestone if too far away using `lodestones.lua`.
- Handles random events.
- Recommended to have wood box in inventory to store nests
  
```diff
+ Showcases use of DoAction_WalkerW for long distance walking.
+ Counts number of logs chopped
- Doesn't log back in if it gets logged out
- Doesn't deposit logs into wood box
```

</ContentBlock>

:::hidden
## Configuration
:::
<ContentBlock title="Configuration">

- Set the keycode of the bank preset you want to use [**bankPresetKeycode**]
    - Follow <u>[**this link**](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes)</u> to find keycodes 

</ContentBlock>

:::hidden
## Changelog
:::

<Changelog changes={changes}>

</Changelog>

:::hidden
## Code
:::

<ContentBlock title="Code">

```lua showLineNumbers
--[[
# Script Name:   Dead's Prifddinas Tree Chopper
# Description:  <Chops trees at Crwys Clan.>
# Autor:        <Dead (dea.d - Discord)>
# Version:      <1.0>
# Datum:        <2023.09.24>

#Changelog
- 2023.09.24 [1.0]
    Release

#Requirements:
    Plague's End completed to access Prifddinas
#Instructions:

> Set the name of the tree to chop [treeToChop]
> Set the name of the logs you receive [logsToCount]
> Set the keycode of the bank preset you want to use [bankPresetKeyCode] https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes

--]]
print("Run Dead's Priff Tree Chopper.")
local version = "2.0"
--#region INCLUDES
local API = require("api")
local LODESTONES = require("lodestones")
local UTILS = require("utils")
--#endregion
API.SetDrawTrackedSkills(true)
API.SetDrawLogs(true)

--#region VARIABLES

--highlight-next-line
local bankPresetKeyCode = 0x72 -- https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes

local imguiBackground = API.CreateIG_answer()
imguiBackground.box_name = "ImguiBackground"
imguiBackground.box_start = FFPOINT.new(20, 40, 0)
imguiBackground.box_size = FFPOINT.new(235, 120, 0)
imguiBackground.colour = ImColor.new(10, 13, 29)

local imguiTitle = API.CreateIG_answer()
imguiTitle.box_name = "imguiLogsChopped";
imguiTitle.box_start = FFPOINT.new(25, 45, 0)
imguiTitle.colour = ImColor.new(138, 186, 168)
imguiTitle.string_value = "Dead's Priff Tree Chopper " .. version

local imguiDropdown = API.CreateIG_answer()
imguiDropdown.box_name = "Trees"
imguiDropdown.box_start = FFPOINT.new(18, 70, 0)
imguiDropdown.box_size = FFPOINT.new(235, 90, 0)
imguiDropdown.stringsArr = {"Magic", "Yew"}
imguiDropdown.colour = ImColor.new(138, 186, 168)

local treeToChop = "Magic tree"
local logsToCount = "Magic logs"
local logs = 0

local imguiLogs = API.CreateIG_answer()
imguiLogs.box_name = "imguiLogs";
imguiLogs.box_start = FFPOINT.new(25, 100, 0)
imguiLogs.colour = ImColor.new(138, 186, 168)
imguiLogs.string_value = logsToCount .. " chopped : " .. tostring(logs)
--#endregion

local firstRun = true
local tickCount = 0
local STATE = 0
local STATES = {
    GOTO_BANK = 0,
    BANK = 1,
    GOTO_TREES = 2,
    CHOP = 3
}

local function drawGUI()
    imguiTitle.string_value =  "Dead's Priff Tree Chopper " .. version .. "\n" .. API.ScriptRuntimeString()
    imguiLogs.string_value = logsToCount .. " chopped : " .. tostring(logs)
    API.DrawSquareFilled(imguiBackground)
    API.DrawComboBox(imguiDropdown, false)
    API.DrawTextAt(imguiTitle)
    API.DrawTextAt(imguiLogs)
end
--#endregion

local function onStart()
    print('on start')
    local priffLodestone = LODESTONES.LODESTONE.PRIFDDINAS.loc
    local playerXYZ = API.PlayerCoord()
    if (API.Math_DistanceW(priffLodestone, playerXYZ) > 68) then
        print('They are different')
        LODESTONES.Prifddinas()
        UTILS.randomSleep(6000)
    else
        print('Already near PRIFDDINAS lodestone')
    end
    if API.Invfreecount_() < 24 then
        STATE = STATES.BANK
    else
        STATE = STATES.GOTO_TREES
    end
end

local function bank()
    if firstRun then
        API.DoAction_WalkerW(WPOINT.new(2240, 3384, 1))
        UTILS.randomSleep(800)
        API.WaitUntilMovingEnds()
        API.DoAction_Object2(0x2e, API.OFF_ACT_GeneralObject_route1, {92692}, 50, WPOINT.new(2237,3385,1))
        UTILS.randomSleep(600)
        API.WaitUntilMovingEnds()
        if API.BankOpen2() then
            API.KeyboardPress2(bankPresetKeyCode,100,300)
            UTILS.randomSleep(600)
            firstRun = false
            STATE = STATES.CHOP
        end
    else
        local invLogsCount = API.InvItemcount_String(logsToCount)
        logs = logs + invLogsCount
        imguiTitle.string_value = "Dead's Priff Tree Chopper\n" .. API.ScriptRuntimeString()
        API.DoAction_Object2(0x33, API.OFF_ACT_GeneralObject_route3, { 92692 }, 50,WPOINT.new(2237,3385,1))
        UTILS.randomSleep(2000)
        API.WaitUntilMovingEnds()
        UTILS.randomSleep(800)
        STATE = STATES.CHOP
    end
end

local function gotoTrees()
    API.DoAction_WalkerW(WPOINT.new(2246, 3367, 1))
    UTILS.randomSleep(1200)
    API.WaitUntilMovingEnds()
    if not API.PInAreaW(WPOINT.new(2245, 3367, 1), 30) then
        STATE = STATES.GOTO_TREES
    else
        STATE = STATES.CHOP
    end
end

local function CHOP(tableTree)
    if not API.InventoryInterfaceCheckvarbit() then
        API.OpenInventoryInterface2()
        UTILS.randomSleep(600)
    end
    local trees = API.GetAllObjArrayInteract_str(tableTree, 50, 0)
    local validTrees = {}
    tickCount = tickCount + 1
    for i = 1, #trees do
        local tree = trees[i]
        if tree.Bool1 == 0 then
            table.insert(validTrees, tree)
        end
    end
    if #validTrees > 0 then
        
    local tree = validTrees[math.random(1,#validTrees)]
    if not API.CheckAnim(20) or not API.WaitUntilMovingEnds() and trees[1] ~= nil then
        API.DoAction_Object2(0x3b, 0, { tree.Id }, 50, WPOINT.new(tree.TileX / 512, tree.TileY / 512, 1))
        UTILS.randomSleep(1200)
        API.WaitUntilMovingEnds()
        tickCount = 0
    end
end

end

local function inventoryCheck()
    if API.Invfreecount_() == 0 then
        STATE = STATES.BANK;
    end
end

local function PrifChopper(tableTree)
    UTILS.gameStateChecks()
    UTILS:antiIdle()
    API.DoRandomEvents()
    drawGUI()
    inventoryCheck()
    if STATE == STATES.BANK then
        bank()
    elseif STATE == STATES.GOTO_TREES then
        gotoTrees()
    elseif STATE == STATES.CHOP then
        CHOP(tableTree)
    end
end

API.logWarn("Dead's Priff Chopper Started!")
if (API.Read_LoopyLoop()) then
    print("Dead Priff Chopper Started!")
    onStart()
    while API.Read_LoopyLoop() do
        if imguiDropdown.int_value == 0 then
            if treeToChop ~= "Magic tree" then
                treeToChop = "Magic tree"
                logsToCount = "Magic logs"
            end
        elseif imguiDropdown.int_value == 1 then
            if treeToChop ~= "Yew" then
                treeToChop = "Yew"
                logsToCount = "Yew logs"
            end
        end
        PrifChopper({treeToChop})
    end
end
API.logWarn("Dead's Priff Chopper Stopped!")

API.SetDrawTrackedSkills(false)
```

</ContentBlock>
