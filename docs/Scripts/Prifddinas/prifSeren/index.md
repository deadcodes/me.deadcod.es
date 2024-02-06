---
title: Seren Stone Miner
description: Mines Seren Stones in Prifddinas
slug: /dead-prif-seren-miner
---

import React from 'react';
import TopBanner from '@site/src/components/TopBanner';
import ContentBlock from '@site/src/components/ContentBlock';
import Changelog from '@site/src/components/Changelog';
import BrowserWindow from '@site/src/components/BrowserWindow';
import changes from './changes.json'

<TopBanner title="Seren Stone Miner" version="2024.02.01" skill="Mining">
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
  
```diff
+ Showcases use of DoAction_WalkerW for long distance walking.
+ Showcases an example implementation of how a state based script can work
- Doesn't log back in if it gets logged out
```

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
# Script Name:   Dead's Prifddinas Seren Stone Miner
# Description:  <Mines Seren Stones at Prifddinas.>
# Autor:        <Dead (dea.d - Discord)>
# Version:      <2.0>
# Datum:        <2024.02.01>
--]]

print("Run Priff Seren Stones Miner.")
local version = "2.0"

--#region INCLUDES
local API = require("api")
local LODESTONES = require("lodestones")
local UTILS = require("utils")
--#endregion

API.SetDrawTrackedSkills(true)
API.SetDrawLogs(true)

--#region VARIABLES
local startXP = API.GetSkillXP("MINING");
local stateXp = startXP;
local forceMine = false;
local noXpGainTick = 0;

-- The X1,X2,Y1,Y2 coords of the rectangle that we consider to be the area in which stones are interactable.
local miningArea = { 2206, 2247, 3208, 3322 }
-- We update this value based on the state transitions
local STATE = 0

-- All the states that we want to track
local STATES = {
    GOTO_STONES = 0,
    MINE_STONES = 1,
    GOTO_PRIFF = 3
}
-- Draws the black background
local imguiBackground = API.CreateIG_answer();
imguiBackground.box_name = "ImguiBackground"
imguiBackground.box_start = FFPOINT.new(20, 40, 0)
imguiBackground.box_size = FFPOINT.new(220, 80, 0)
imguiBackground.colour = ImColor.new(10, 13, 29)

local ImGuiTitle = API.CreateIG_answer()
ImGuiTitle.box_start = FFPOINT.new(25, 45, 0)
ImGuiTitle.colour = ImColor.new(37,194,160)
ImGuiTitle.string_value = "Dead's Prif Seren Miner " .. version
--#endregion

--#region METHODS

-- Draws the imgui objects to the screen
local function drawMetrics()
    local xpGained = API.GetSkillXP("MINING") - stateXp;
    API.DrawSquareFilled(imguiBackground)
    ImGuiTitle.string_value = "Dead's Prif Seren Miner " .. version .. "\n" .. API.ScriptRuntimeString()
    API.DrawTextAt(ImGuiTitle)
    if xpGained > 0 then
        stateXp = stateXp + xpGained;
        noXpGainTick = 0;
    else
        noXpGainTick = noXpGainTick + 1;
    end
end


local function gameStateChecks()
    UTILS.gameStateChecks()
    if noXpGainTick > 30 then
        API.logError('Not gaining xp, exiting')
        print('Not gaining xp')
        API.Write_LoopyLoop(false)
    end
end

local function onStart()
    print('on start')
    local priffLodestone = LODESTONES.LODESTONE.PRIFDDINAS.loc
    local playerXYZ = API.PlayerCoord()
    if not API.PInArea21(miningArea[1], miningArea[2], miningArea[3], miningArea[4]) and (API.Math_DistanceW(priffLodestone, playerXYZ) > 50) then
        print('Not at stones area or in PRIFDDINAS')
        STATE = STATES.GOTO_PRIFF
    else
        print('Already near PRIFDDINAS lodestone')
        STATE = STATES.GOTO_STONES
    end
end

local function gotoPriff()
    LODESTONES.Prifddinas()
    STATE = STATES.GOTO_STONES
end

local function gotoStones()
    if not API.PInArea21(miningArea[1], miningArea[2], miningArea[3], miningArea[4]) then
        API.DoAction_WalkerW(WPOINT.new(2232, 3310, 1))
    end
    STATE = STATES.MINE_STONES
end

local function mineStones()
    if not API.CheckAnim(20) then
        API.DoAction_Object_string1(0x3a, API.OFF_ACT_GeneralObject_route0, { "Seren stone" }, 50, true)
        UTILS.randomSleep(600)
        API.WaitUntilMovingEnds()
    else
        if forceMine then
            API.logInfo('Force Mine')
            API.DoAction_Object_string1(0x3a, API.OFF_ACT_GeneralObject_route0, { "Seren stone" }, 50, true)
            UTILS.randomSleep(600)
            forceMine = false
        end
    end
end

local function priffSerenMiner()
    gameStateChecks()
    drawMetrics()
    API.DoRandomEvents()
    if UTILS:antiIdle() then forceMine = true end
    if STATE == STATES.GOTO_PRIFF then
        gotoPriff()
    elseif STATE == STATES.GOTO_STONES then
        gotoStones()
    elseif STATE == STATES.MINE_STONES then
        mineStones()
    end
    UTILS.randomSleep(600)
end

--#endregion

-- Main Loop
API.Write_LoopyLoop(true)
API.logWarn("Dead's Priff Seren Stones Started!")
onStart()
while API.Read_LoopyLoop() do
    priffSerenMiner()
end
API.logWarn("Dead's Priff Seren Stones Done!")
API.SetDrawTrackedSkills(false)
```

</ContentBlock>
