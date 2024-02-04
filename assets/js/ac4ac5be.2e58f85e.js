"use strict";(self.webpackChunkdeadcodes=self.webpackChunkdeadcodes||[]).push([[659],{8024:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>g,contentTitle:()=>c,default:()=>h,frontMatter:()=>d,metadata:()=>u,toc:()=>p});var i=o(5893),t=o(1151),r=(o(7294),o(6234)),s=o(3504),l=o(2765);o(5687);const a=JSON.parse('[{"date":"2024-02-01","title":"Update 2.0","items":["Added dropdown to select which tree to chop","Now uses the updated UTIL functions","Code cleanup"]},{"date":"2023-09-24","title":"Release","items":["Release"]}]'),d={title:"Tree Chopper",description:"Chops Trees in Prifddinas",slug:"/dead-prif-trees"},c=void 0,u={id:"Scripts/Prifddinas/prifTrees/index",title:"Tree Chopper",description:"Chops Trees in Prifddinas",source:"@site/docs/Scripts/Prifddinas/prifTrees/index.md",sourceDirName:"Scripts/Prifddinas/prifTrees",slug:"/dead-prif-trees",permalink:"/dead-prif-trees",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Tree Chopper",description:"Chops Trees in Prifddinas",slug:"/dead-prif-trees"},sidebar:"kbSidebar",previous:{title:"Seren Stone Miner",permalink:"/dead-prif-seren-miner"},next:{title:"DeadButterfly",permalink:"/dead-butterfly"}},g={},p=[{value:"Requirements",id:"requirements",level:2},{value:"Features",id:"features",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Code",id:"code",level:2}];function T(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Z,{title:"Tree Chopper",version:"2024.02.01",skill:"Woodcutting"}),"\n",(0,i.jsx)(n.admonition,{type:"hidden",children:(0,i.jsx)(n.h2,{id:"requirements",children:"Requirements"})}),"\n",(0,i.jsx)(s.Z,{title:"Requirements",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.a,{href:"https://runescape.wiki/w/Plague%27s_End",children:(0,i.jsx)(n.strong,{children:"Plague's End"})})," completed to access Prifddinas"]}),"\n"]})}),"\n",(0,i.jsx)(n.admonition,{type:"hidden",children:(0,i.jsx)(n.h2,{id:"features",children:"Features"})}),"\n",(0,i.jsxs)(s.Z,{title:"Features",children:[(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Automatically teleports to Prifddinas lodestone if too far away using ",(0,i.jsx)(n.code,{children:"lodestones.lua"}),"."]}),"\n",(0,i.jsx)(n.li,{children:"Handles random events."}),"\n",(0,i.jsx)(n.li,{children:"Recommended to have wood box in inventory to store nests"}),"\n"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"+ Showcases use of DoAction_WalkerW for long distance walking.\n+ Counts number of logs chopped\n- Doesn't log back in if it gets logged out\n- Doesn't deposit logs into wood box\n"})})]}),"\n",(0,i.jsx)(n.admonition,{type:"hidden",children:(0,i.jsx)(n.h2,{id:"configuration",children:"Configuration"})}),"\n",(0,i.jsx)(s.Z,{title:"Configuration",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Set the keycode of the bank preset you want to use [",(0,i.jsx)(n.strong,{children:"bankPresetKeycode"}),"]","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Follow ",(0,i.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes",children:(0,i.jsx)(n.strong,{children:"this link"})})," to know what keycodes to use"]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,i.jsx)(n.admonition,{type:"hidden",children:(0,i.jsx)(n.h2,{id:"changelog",children:"Changelog"})}),"\n",(0,i.jsx)(l.Z,{changes:a}),"\n",(0,i.jsx)(n.admonition,{type:"hidden",children:(0,i.jsx)(n.h2,{id:"code",children:"Code"})}),"\n",(0,i.jsx)(s.Z,{title:"Code",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-lua",metastring:"showLineNumbers",children:'--[[\n# Script Name:   Dead\'s Prifddinas Tree Chopper\n# Description:  <Chops trees at Crwys Clan.>\n# Autor:        <Dead (dea.d - Discord)>\n# Version:      <1.0>\n# Datum:        <2023.09.24>\n\n#Changelog\n- 2023.09.24 [1.0]\n    Release\n\n#Requirements:\n    Plague\'s End completed to access Prifddinas\n#Instructions:\n\n> Set the name of the tree to chop [treeToChop]\n> Set the name of the logs you receive [logsToCount]\n> Set the keycode of the bank preset you want to use [bankPresetKeyCode] https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes\n\n--]]\nprint("Run Dead\'s Priff Tree Chopper.")\nlocal version = "2.0"\n--#region INCLUDES\nlocal API = require("api")\nlocal LODESTONES = require("lodestones")\nlocal UTILS = require("utils")\n--#endregion\nAPI.SetDrawTrackedSkills(true)\nAPI.SetDrawLogs(true)\n\n--#region VARIABLES\n\n--highlight-next-line\nlocal bankPresetKeyCode = 0x72 -- https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes\n\nlocal imguiBackground = API.CreateIG_answer()\nimguiBackground.box_name = "ImguiBackground"\nimguiBackground.box_start = FFPOINT.new(20, 40, 0)\nimguiBackground.box_size = FFPOINT.new(235, 120, 0)\nimguiBackground.colour = ImColor.new(10, 13, 29)\n\nlocal imguiTitle = API.CreateIG_answer()\nimguiTitle.box_name = "imguiLogsChopped";\nimguiTitle.box_start = FFPOINT.new(25, 45, 0)\nimguiTitle.colour = ImColor.new(138, 186, 168)\nimguiTitle.string_value = "Dead\'s Priff Tree Chopper " .. version\n\nlocal imguiDropdown = API.CreateIG_answer()\nimguiDropdown.box_name = "Trees"\nimguiDropdown.box_start = FFPOINT.new(18, 70, 0)\nimguiDropdown.box_size = FFPOINT.new(235, 90, 0)\nimguiDropdown.stringsArr = {"Magic", "Yew"}\nimguiDropdown.colour = ImColor.new(138, 186, 168)\n\nlocal treeToChop = "Magic tree"\nlocal logsToCount = "Magic logs"\nlocal logs = 0\n\nlocal imguiLogs = API.CreateIG_answer()\nimguiLogs.box_name = "imguiLogs";\nimguiLogs.box_start = FFPOINT.new(25, 100, 0)\nimguiLogs.colour = ImColor.new(138, 186, 168)\nimguiLogs.string_value = logsToCount .. " chopped : " .. tostring(logs)\n--#endregion\n\nlocal firstRun = true\nlocal tickCount = 0\nlocal STATE = 0\nlocal STATES = {\n    GOTO_BANK = 0,\n    BANK = 1,\n    GOTO_TREES = 2,\n    CHOP = 3\n}\n\nlocal function drawGUI()\n    imguiTitle.string_value =  "Dead\'s Priff Tree Chopper " .. version .. "\\n" .. API.ScriptRuntimeString()\n    imguiLogs.string_value = logsToCount .. " chopped : " .. tostring(logs)\n    API.DrawSquareFilled(imguiBackground)\n    API.DrawComboBox(imguiDropdown, false)\n    API.DrawTextAt(imguiTitle)\n    API.DrawTextAt(imguiLogs)\nend\n--#endregion\n\nlocal function onStart()\n    print(\'on start\')\n    local priffLodestone = LODESTONES.LODESTONE.PRIFDDINAS.loc\n    local playerXYZ = API.PlayerCoord()\n    if (API.Math_DistanceW(priffLodestone, playerXYZ) > 68) then\n        print(\'They are different\')\n        LODESTONES.Prifddinas()\n        UTILS.randomSleep(6000)\n    else\n        print(\'Already near PRIFDDINAS lodestone\')\n    end\n    if API.Invfreecount_() < 24 then\n        STATE = STATES.BANK\n    else\n        STATE = STATES.GOTO_TREES\n    end\nend\n\nlocal function bank()\n    if firstRun then\n        API.DoAction_WalkerW(WPOINT.new(2240, 3384, 1))\n        UTILS.randomSleep(800)\n        API.WaitUntilMovingEnds()\n        API.DoAction_Object2(0x2e, API.OFF_ACT_GeneralObject_route1, {92692}, 50, WPOINT.new(2237,3385,1))\n        UTILS.randomSleep(600)\n        API.WaitUntilMovingEnds()\n        if API.BankOpen2() then\n            API.KeyboardPress2(bankPresetKeyCode,100,300)\n            UTILS.randomSleep(600)\n            firstRun = false\n            STATE = STATES.CHOP\n        end\n    else\n        local invLogsCount = API.InvItemcount_String(logsToCount)\n        logs = logs + invLogsCount\n        imguiTitle.string_value = "Dead\'s Priff Tree Chopper\\n" .. API.ScriptRuntimeString()\n        API.DoAction_Object2(0x33, API.OFF_ACT_GeneralObject_route3, { 92692 }, 50,WPOINT.new(2237,3385,1))\n        UTILS.randomSleep(2000)\n        API.WaitUntilMovingEnds()\n        UTILS.randomSleep(800)\n        STATE = STATES.CHOP\n    end\nend\n\nlocal function gotoTrees()\n    API.DoAction_WalkerW(WPOINT.new(2246, 3367, 1))\n    UTILS.randomSleep(1200)\n    API.WaitUntilMovingEnds()\n    if not API.PInAreaW(WPOINT.new(2245, 3367, 1), 30) then\n        STATE = STATES.GOTO_TREES\n    else\n        STATE = STATES.CHOP\n    end\nend\n\nlocal function CHOP(tableTree)\n    if not API.InventoryInterfaceCheckvarbit() then\n        API.OpenInventoryInterface2()\n        UTILS.randomSleep(600)\n    end\n    local trees = API.GetAllObjArrayInteract_str(tableTree, 50, 0)\n    local validTrees = {}\n    tickCount = tickCount + 1\n    for i = 1, #trees do\n        local tree = trees[i]\n        if tree.Bool1 == 0 then\n            table.insert(validTrees, tree)\n        end\n    end\n    if #validTrees > 0 then\n        \n    local tree = validTrees[math.random(1,#validTrees)]\n    if not API.CheckAnim(20) or not API.WaitUntilMovingEnds() and trees[1] ~= nil then\n        API.DoAction_Object2(0x3b, 0, { tree.Id }, 50, WPOINT.new(tree.TileX / 512, tree.TileY / 512, 1))\n        UTILS.randomSleep(1200)\n        API.WaitUntilMovingEnds()\n        tickCount = 0\n    end\nend\n\nend\n\nlocal function inventoryCheck()\n    if API.Invfreecount_() == 0 then\n        STATE = STATES.BANK;\n    end\nend\n\nlocal function PrifChopper(tableTree)\n    UTILS.gameStateChecks()\n    UTILS:antiIdle()\n    API.DoRandomEvents()\n    drawGUI()\n    inventoryCheck()\n    if STATE == STATES.BANK then\n        bank()\n    elseif STATE == STATES.GOTO_TREES then\n        gotoTrees()\n    elseif STATE == STATES.CHOP then\n        CHOP(tableTree)\n    end\nend\n\nAPI.logWarn("Dead\'s Priff Chopper Started!")\nif (API.Read_LoopyLoop()) then\n    print("Dead Priff Chopper Started!")\n    onStart()\n    while API.Read_LoopyLoop() do\n        if imguiDropdown.int_value == 0 then\n            if treeToChop ~= "Magic tree" then\n                treeToChop = "Magic tree"\n                logsToCount = "Magic logs"\n            end\n        elseif imguiDropdown.int_value == 1 then\n            if treeToChop ~= "Yew" then\n                treeToChop = "Yew"\n                logsToCount = "Yew logs"\n            end\n        end\n        PrifChopper({treeToChop})\n    end\nend\nAPI.logWarn("Dead\'s Priff Chopper Stopped!")\n\nAPI.SetDrawTrackedSkills(false)\n'})})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(T,{...e})}):T(e)}}}]);