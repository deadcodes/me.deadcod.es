---
title: DeadDigger™
description: Digs Things
slug: /dead-digger
---

import React from 'react';
import TopBanner from '@site/src/components/TopBanner';
import ContentBlock from '@site/src/components/ContentBlock';
import Changelog from '@site/src/components/Changelog';
import BrowserWindow from '@site/src/components/BrowserWindow';
import changes from './changes.json'

<TopBanner title="Dead Digger" version="2023.11.1">
</TopBanner>

:::hidden
## Configuration
:::

<ContentBlock title="Configuration">
IM THE CONTENT
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

```js showLineNumbers
local API = require("api")
local UTILS = require("utils")

-- #region Imgui Setup - made by Dead
local imguiBackground = API.CreateIG_answer();
imguiBackground.box_name = "imguiBackground";
-- imguiBackground.box_start = FFPOINT.new(16, 20, 0);
imguiBackground.box_start = FFPOINT.new(16, 50, 0);
imguiBackground.box_size = FFPOINT.new(300, 116, 0)

local getTargetBtn = API.CreateIG_answer();
getTargetBtn.box_name = "Get";
getTargetBtn.box_start = FFPOINT.new(16, 50, 0);
getTargetBtn.box_size = FFPOINT.new(50, 30, 0);
getTargetBtn.tooltip_text = "Populate spot list"

local setTargetBtn = API.CreateIG_answer();
setTargetBtn.box_name = "Set";
setTargetBtn.box_start = FFPOINT.new(60, 50, 0);
setTargetBtn.box_size = FFPOINT.new(50, 30, 0);
setTargetBtn.tooltip_text = "The script will excavate this spot"

local imguicombo = API.CreateIG_answer()
imguicombo.box_name = "Spots    "
imguicombo.box_start = FFPOINT.new(100, 50, 0)
imguicombo.stringsArr = {"a", "b"}
imguicombo.tooltip_text = "Available spot to target"

local imguiCurrentTarget = API.CreateIG_answer();
imguiCurrentTarget.box_name = "Current Target:";
imguiCurrentTarget.box_start = FFPOINT.new(30, 80, 0);

local imguiEXCAVATE = API.CreateIG_answer();
imguiEXCAVATE.box_name = "EXCAVATE";
imguiEXCAVATE.box_start = FFPOINT.new(18, 80, 0);
imguiEXCAVATE.box_size = FFPOINT.new(80, 30, 0);
imguiEXCAVATE.tooltip_text = "Start/Stop excavating"

local imguiTerminate = API.CreateIG_answer();
imguiTerminate.box_name = "Stop Script";
imguiTerminate.box_start = FFPOINT.new(100, 80, 0);
imguiTerminate.box_size = FFPOINT.new(100, 30, 0);
imguiTerminate.tooltip_text = "Exit the script"

-- local imguiRuntime = API.CreateIG_answer();
-- imguiRuntime.box_name = "imguiRuntime";
-- imguiRuntime.box_start = FFPOINT.new(30, 90, 0);

API.DrawComboBox(imguicombo, false)
-- #endregion

-- #region Variables init

local runDigger = false
local targetNotFoundCount = 0

local IDS = {
    EXCALIBUR = 14632,
    EXCALIBUR_AUGMENTED = 36619,
    ELVEN_SHARD = 43358
}

local COLORS = {
    BACKGROUND = ImColor.new(10, 13, 29),
    TARGET_UNSET = ImColor.new(189, 185, 167),
    TARGET_SET = ImColor.new(70, 143, 126),
    EXCAVATE = ImColor.new(84, 166, 102),
    PAUSED = ImColor.new(238, 59, 83),
    RUNTIME = ImColor.new(198, 120, 102)
}

imguiBackground.colour = COLORS.BACKGROUND
imguiCurrentTarget.colour = COLORS.TARGET_UNSET
-- imguiRuntime.colour = COLORS.EXCAVATE
-- #endregion

local MAX_IDLE_TIME_MINUTES = 5
local soilBoxFull = false;
local depositAttempt = 0

-- #region User Inputs
local itemToGather = "None. Select one Spot"
local cartName = "Materials cart"
local soilboxKeybind = "-"
local soilKeybind = "="
local soilboxCapacity = 50

local SOILS = {
    ANCIENT_GRAVEL = {
        label = "Ancient gravel",
        vb = 9370
    },
    FIERY_BRIMSTONE = {
        label = "Fiery brimstone",
        vb = 9372
    },
    SALTWATER_MUD = {
        label = "Saltwater mud",
        vb = 9371
    },
    AERATED_SEDIMENT = {
        label = "Aerated sediment",
        vb = 9373
    },
    EARTHEN_CLAY = {
        label = "Earthen clay",
        vb = 9374
    },
    VOLCANIC_ASH = {
        label = "Volcanic ash",
        vb = 9578
    }
}

local ExcavationSpots = {"Venator remains", "Legionary remains", "Castra debris", "Lodge bar storage",
                         "Lodge art storage", "Administratum debris", "Cultist footlocker", "Sacrificial altar",
                         "Prodromoi remains", "Dis dungeon debris", "Praesidio remains", "Monoceros remains",
                         "Amphitheatre debris", "Ceramics studio debris", "Carcerem debris", "Stadio debris",
                         "Infernal art", "Shakroth remains", "Dominion games podium", "Ikovian memorial",
                         "Oikos studio debris", "Kharid-et chapel debris", "Gladitorial goblin remains", "Keshik ger",
                         "Crucible stands debris", "Pontifex remains", "Animal trophies", "Tailory debris",
                         "Goblin dorm debris", "Oikos fishing hut remnants", "Weapons research debris", "Orcus altar",
                         "Dis overspill", "Big High War God shrine", "Varanusaur remains", "Gravitron research debris",
                         "Acropolis debris", "Armarium debris", "Yu'biusk animal pen", "Keshik tower debris",
                         "Dragonkin reliquary", "Goblin trainee remains", "Byzroth remains", "Destroyed golem",
                         "Dragonkin coffin", "Kyzaj champion's boudoir", "Culinarum debris", "Icyene weapon rack",
                         "Autopsy table", "Experiment workbench", "Keshik weapon rack", "Hellfire forge",
                         "Warforge scrap pile", "Stockpiled art", "Aughra remains", "Ancient magick munitions",
                         "Moksha device", "Bibliotheke debris", "Chthonian trophies", "Warforge weapon rack",
                         "Flight research debris", "Aetherium forge", "Xolo mine", "Praetorian remains",
                         "Bandos' sanctum debris", "Tsutsaroth remains", "Optimatoi debris", "Howl's workshop debris",
                         "War table debris", "Makeshift pie oven", "Xolo remains", "Saurthen debris"}

local ExcavationSpotsFound = {}

local soil = SOILS.FIERY_BRIMSTONE
-- #endregion

local function gameStateChecks()
    local gameState = API.GetGameState()
    if (gameState ~= 3) then
        print('Not ingame with state:', gameState)
        API.Write_LoopyLoop(false)
        return
    end
    if targetNotFoundCount > 30 then
        imguiEXCAVATE.box_name = "Excavate"
        runDigger = false;
        API.Write_LoopyLoop(false)
    end
end
local function terminate()
    runDigger = false
    API.Write_LoopyLoop(false)
end
-- imguicombo.stringsArr = ExcavationSpots
local function populateDropdown()
    print('populateDropdown')
    local allNPCS = API.ReadAllObjectsArray(false, 0)
    local objects = {}
    if #allNPCS > 0 then
        for _, a in pairs(allNPCS) do
            local distance = API.Math_DistanceF(a.Tile_XYZ, API.PlayerCoordfloat())
            a.Distance = distance;
            if a.Id ~= 0 and distance < 50 and a.Name ~= "" then
                for _, v in pairs(ExcavationSpots) do
                    if v == a.Name then
                        table.insert(objects, a.Name)
                    end
                end
            end
        end
        local distinct = UTILS.getDistinctValues(objects)
        if #distinct > 0 then
            table.sort(distinct)
            imguicombo.stringsArr = distinct
        end
    end
end

-- Get Current Time in [hh:mm:ss]
local function getCurrentTimeFormatted()
    return os.date("[%H:%M:%S]")
end

local function FindHl(objects, maxdistance, highlight)
    local objObjs = API.GetAllObjArray1(objects, maxdistance, 0)
    local hlObjs = API.GetAllObjArray1(highlight, maxdistance, 4)
    local shiny = {}
    for i = 0, 2.9, 0.1 do
        for _, obj in ipairs(objObjs) do
            for _, hl in ipairs(hlObjs) do
                if math.abs(obj.Tile_XYZ.x - hl.Tile_XYZ.x) < i and math.abs(obj.Tile_XYZ.y - hl.Tile_XYZ.y) < i then
                    shiny = obj
                end
            end
        end
    end
    return shiny
end
local function followTimeSprite(objects)
    local targets = API.FindObject_string(objects, 60)
    local targetIds = {}
    for i = 1, #targets do
        local rock = targets[i]
        if rock.Id ~= 116784 then -- Sacrifical altar/same name as spot
            table.insert(targetIds, rock.Id)
        end
    end
    local sprite = FindHl(targetIds, 60, {7307})
    if sprite.Id ~= nil then
        local spritePos = WPOINT.new(sprite.TileX / 512, sprite.TileY / 512, sprite.TileZ / 512)
        local distanceF = API.Math_DistanceF(API.PlayerCoordfloat(), sprite.Tile_XYZ)
        if distanceF > 2 then
            UTILS.randomSleep(1000)
            print("Sprite has moved, chasing it")
            API.DoAction_Object2(0x2, API.OFF_ACT_GeneralObject_route0, {sprite.Id}, 60, spritePos);
            UTILS.randomSleep(1000)
            API.WaitUntilMovingEnds()
        end
        if not API.CheckAnim(100) then
            print("Excavating " .. itemToGather)
            API.DoAction_Object1(0x2, API.OFF_ACT_GeneralObject_route0, targetIds, 60);
        end
    else
        if not API.CheckAnim(100) then
            print("Excavating " .. itemToGather)
            API.DoAction_Object1(0x2, API.OFF_ACT_GeneralObject_route0, targetIds, 60);
        end
    end
    UTILS.randomSleep(600)
end

local function dropSoil()
    if soilBoxFull and API.InvItemcount_String(soil.label) > 0 then
        print('Dropping soil')
        API.KeyboardPress(soilKeybind, 100, 200)
    end
end

local function inventoryCheck()
    if depositAttempt > 1 then
        print('Inventory still full after depositing 5 times')
        API.Write_LoopyLoop(false)
        return false;
    end
    if API.VB_FindPSett(soil.vb).SumOfstate == soilboxCapacity then
        soilBoxFull = true;
    else
        soilBoxFull = false;
    end
    local emptySpots = API.Invfreecount_()
    if API.InvFull_() then
        if not soilBoxFull then
            print('Inventory is full, trying to fill soilbox')
            API.KeyboardPress(soilboxKeybind, 100, 200)
            UTILS.randomSleep(600)
        end
        local spotsAfterFill = API.Invfreecount_()
        if spotsAfterFill <= emptySpots then
            print('Inventory is full after using soilbox, trying to deposit')
            local cart = API.GetAllObjArrayInteract_str({cartName}, 60, 0)
            if #cart > 0 then
                depositAttempt = depositAttempt + 1;
                API.DoAction_Object_string1(0x29, API.OFF_ACT_GeneralObject_route0, {cartName}, 60, true);
                UTILS.randomSleep(1200)
                API.WaitUntilMovingEnds()
                UTILS.randomSleep(600)
                if not API.InvFull_() then
                    depositAttempt = 0
                end
            end
        end
    end
end
local function setSpot()
    print('setSpot')
    local currentMob = itemToGather;
    local selected = imguicombo.stringsArr[imguicombo.int_value + 1]
    if currentMob ~= selected then
        itemToGather = selected;
    end
    imguiCurrentTarget.colour = COLORS.TARGET_SET
    setTargetBtn.return_click = false;
end

local function pauseExcavation()
    runDigger = false
    print("Excavation paused")
    imguiEXCAVATE.return_click = false
    imguiCurrentTarget.colour = COLORS.PAUSED
    -- imguiRuntime.colour = COLORS.PAUSED
    imguiEXCAVATE.box_name = "EXCAVATE"
end

local function startExcavation()
    print("Excavation started")
    runDigger = true;
    imguiCurrentTarget.colour = COLORS.EXCAVATE
    -- imguiRuntime.colour = COLORS.EXCAVATE
    imguiEXCAVATE.box_name = "Pause"
end

local function drawGUI()
    if imguiTerminate.return_click then
        terminate()
    end
    if imguiEXCAVATE.return_click then
        if not runDigger then
            startExcavation()
        end
    else
        if runDigger then
            pauseExcavation()
        end
    end
    if getTargetBtn.return_click then
        populateDropdown()
        getTargetBtn.return_click = false
    end
    if not runDigger and setTargetBtn.return_click then
        setSpot()
    end
    API.DrawSquareFilled(imguiBackground)
    API.DrawBox(setTargetBtn)
    API.DrawBox(getTargetBtn)
    imguiCurrentTarget.string_value = "Current target:" .. itemToGather
    -- imguiRuntime.string_value = formatElapsedTime(startTime) -- os.difftime(os.time(),startTime)
    API.DrawBox(imguiEXCAVATE)
    API.DrawBox(imguiTerminate)
    API.DrawTextAt(imguiCurrentTarget)
    -- API.DrawTextAt(imguiRuntime)
end

populateDropdown()
API.Write_LoopyLoop(true)
while (API.Read_LoopyLoop()) do ------------------------------------------------------
    API.DoRandomEvents()
    gameStateChecks()
    drawGUI()
    if runDigger then
        followTimeSprite({itemToGather})
        inventoryCheck()
        dropSoil()
    end
    UTILS.randomSleep(300)
end ----------------------------------------------------------------------------------

```

</ContentBlock>
