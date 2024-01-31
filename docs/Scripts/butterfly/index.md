---
title: DeadButterfly
description: Catches Butterflies
slug: /dead-butterfly
---


import React from 'react';
import TopBanner from '@site/src/components/TopBanner';
import ContentBlock from '@site/src/components/ContentBlock';
import Changelog from '@site/src/components/Changelog';
import BrowserWindow from '@site/src/components/BrowserWindow';
import changes from './changes.json'

<TopBanner title="Dead Butterfly" version="2023.11" skill="Hunter">
</TopBanner>

:::hidden
## Features
:::

<ContentBlock title="Features">

- The tile your character was standing on when you started the script is considered as Home Tile
- If it detects that you're losing health, it runs back to the Home Tile.
- If you wander too far from the Home Tile, it goes back to the Home Tile.

</ContentBlock>

:::hidden
## Configuration
:::
<ContentBlock title="Configuration">

- Set the name of the entity you want to catch on line 9

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
local API = require("api")
local UTILS = require("utils")

API.SetDrawLogs(true)
API.SetDrawTrackedSkills(true)

print("Dead's Butterfly Catcher started")
API.logInfo("Dead's Butterfly Catcher started")
--highlight-next-line
local entityToCatch = "Charming moth"           -- Set this value
local startTime, afk = os.time(), os.time()
local MAX_IDLE_TIME_MINUTES = 5
local failureCount = 0
local startTile = API.PlayerCoord()
local health = API.GetHP_()

local function idleCheck()
    local timeDiff = os.difftime(os.time(), afk)
    local randomTime = math.random((MAX_IDLE_TIME_MINUTES * 60) * 0.6, (MAX_IDLE_TIME_MINUTES * 60) * 0.9)

    if timeDiff > randomTime then
        API.PIdle2()
        afk = os.time()
        return true
    end
end

local function gameStateChecks()
    local gameState = API.GetGameState()
    if (gameState ~= 3) then
        API.logError('Not ingame with state:' .. tostring(gameState))
        API.Write_LoopyLoop(false)
        return
    end
    if API.InvFull_() then
        API.logError('inventory full, stopping')
        API.Write_LoopyLoop(false)
        return
    end
    if failureCount > 50 then
        API.logError('Couldnt find moths more than 50 times, exiting')
        API.Write_LoopyLoop(false)
    end
end

local function walkBack()
    API.DoAction_WalkerW(startTile);
end

local function runBackIfUnderAttack()
    local currentHealth = API.GetHP_()
    if currentHealth < health then
        API.logWarn('Were under attack, running back to start point')
        if not API.ReadPlayerMovin2() then
            walkBack()
            health = currentHealth
        end
    elseif currentHealth > health then
        health = currentHealth
    end
end

local function CatchAButterfly()
    local interactingWithMoth = API.Local_PlayerInterActingWith_22(20, entityToCatch)
    if not (interactingWithMoth or API.ReadPlayerAnim() ~= 0) and not API.ReadPlayerMovin2() then
        local moth = API.FindNPCbyName(entityToCatch, 30)
        if moth ~= nil and moth.Id ~= 0 then
            if API.Math_DistanceF(moth.Tile_XYZ, API.PlayerCoordfloat()) > 50 then
            API.logInfo('Too far from target, walking back')
                API.DoAction_WalkerF(moth.Tile_XYZ)
            end
            API.DoAction_NPC(0x29, API.OFF_ACT_InteractNPC_route, {moth.Id}, 50)
        else
            if API.Math_DistanceW(startTile, API.PlayerCoord()) > 50 then
            API.logInfo('Wandered off, going back')
                walkBack()
            end
            failureCount  = failureCount + 1
        end
        failureCount = 0
        UTILS.randomSleep(300)
    else
        runBackIfUnderAttack()
    end
end
API.logInfo('Starting to catch:' .. entityToCatch)
API.Write_LoopyLoop(true)
while API.Read_LoopyLoop() do
    gameStateChecks()
    idleCheck()
    runBackIfUnderAttack()
    API.DoRandomEvents()
    CatchAButterfly()
    UTILS.randomSleep(300)
end
```

</ContentBlock>
