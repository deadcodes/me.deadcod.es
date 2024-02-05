"use strict";(self.webpackChunkdeadcodes=self.webpackChunkdeadcodes||[]).push([[784],{3921:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>d,metadata:()=>S,toc:()=>f});var r=i(5893),t=i(1151),a=(i(7294),i(6234)),o=i(3504),s=i(2765);i(5687);const l=JSON.parse('[{"date":"2024-02-01","title":"Update 2.0","items":["Now uses the updated UTIL functions","Code cleanup"]},{"date":"2023.08.30","title":"Release","items":["Release"]}]'),d={title:"Seren Stone Miner",description:"Mines Seren Stones in Prifddinas",slug:"/dead-prif-seren-miner"},c=void 0,S={id:"Scripts/Prifddinas/prifSeren/index",title:"Seren Stone Miner",description:"Mines Seren Stones in Prifddinas",source:"@site/docs/Scripts/Prifddinas/prifSeren/index.md",sourceDirName:"Scripts/Prifddinas/prifSeren",slug:"/dead-prif-seren-miner",permalink:"/me.deadcod.es/dead-prif-seren-miner",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Seren Stone Miner",description:"Mines Seren Stones in Prifddinas",slug:"/dead-prif-seren-miner"},sidebar:"kbSidebar",previous:{title:"Soft Clay Miner",permalink:"/me.deadcod.es/dead-prif-clay-miner"},next:{title:"Tree Chopper",permalink:"/me.deadcod.es/dead-prif-trees"}},u={},f=[{value:"Requirements",id:"requirements",level:2},{value:"Features",id:"features",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Code",id:"code",level:2}];function g(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.Z,{title:"Seren Stone Miner",version:"2024.02.01",skill:"Mining"}),"\n",(0,r.jsx)(n.admonition,{type:"hidden",children:(0,r.jsx)(n.h2,{id:"requirements",children:"Requirements"})}),"\n",(0,r.jsx)(o.Z,{title:"Requirements",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://runescape.wiki/w/Plague%27s_End",children:(0,r.jsx)(n.strong,{children:"Plague's End"})})," completed to access Prifddinas"]}),"\n"]})}),"\n",(0,r.jsx)(n.admonition,{type:"hidden",children:(0,r.jsx)(n.h2,{id:"features",children:"Features"})}),"\n",(0,r.jsxs)(o.Z,{title:"Features",children:[(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Automatically teleports to Prifddinas lodestone if too far away using ",(0,r.jsx)(n.code,{children:"lodestones.lua"}),"."]}),"\n",(0,r.jsx)(n.li,{children:"Handles random events."}),"\n"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-diff",children:"+ Showcases use of DoAction_WalkerW for long distance walking.\n+ Showcases an example implementation of how a state based script can work\n- Doesn't log back in if it gets logged out\n"})})]}),"\n",(0,r.jsx)(n.admonition,{type:"hidden",children:(0,r.jsx)(n.h2,{id:"changelog",children:"Changelog"})}),"\n",(0,r.jsx)(s.Z,{changes:l}),"\n",(0,r.jsx)(n.admonition,{type:"hidden",children:(0,r.jsx)(n.h2,{id:"code",children:"Code"})}),"\n",(0,r.jsx)(o.Z,{title:"Code",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-lua",metastring:"showLineNumbers",children:'--[[\n# Script Name:   Dead\'s Prifddinas Seren Stone Miner\n# Description:  <Mines Seren Stones at Prifddinas.>\n# Autor:        <Dead (dea.d - Discord)>\n# Version:      <2.0>\n# Datum:        <2024.02.01>\n--]]\n\nprint("Run Priff Seren Stones Miner.")\nlocal version = "2.0"\n\n--#region INCLUDES\nlocal API = require("api")\nlocal LODESTONES = require("lodestones")\nlocal UTILS = require("utils")\n--#endregion\n\nAPI.SetDrawTrackedSkills(true)\nAPI.SetDrawLogs(true)\n\n--#region VARIABLES\nlocal startXP = API.GetSkillXP("MINING");\nlocal stateXp = startXP;\nlocal forceMine = false;\nlocal noXpGainTick = 0;\n\n-- The X1,X2,Y1,Y2 coords of the rectangle that we consider to be the area in which stones are interactable.\nlocal miningArea = { 2206, 2247, 3208, 3322 }\n-- We update this value based on the state transitions\nlocal STATE = 0\n\n-- All the states that we want to track\nlocal STATES = {\n    GOTO_STONES = 0,\n    MINE_STONES = 1,\n    GOTO_PRIFF = 3\n}\n-- Draws the black background\nlocal imguiBackground = API.CreateIG_answer();\nimguiBackground.box_name = "ImguiBackground"\nimguiBackground.box_start = FFPOINT.new(20, 40, 0)\nimguiBackground.box_size = FFPOINT.new(220, 80, 0)\nimguiBackground.colour = ImColor.new(10, 13, 29)\n\nlocal ImGuiTitle = API.CreateIG_answer()\nImGuiTitle.box_start = FFPOINT.new(25, 45, 0)\nImGuiTitle.colour = ImColor.new(37,194,160)\nImGuiTitle.string_value = "Dead\'s Prif Seren Miner " .. version\n--#endregion\n\n--#region METHODS\n\n-- Draws the imgui objects to the screen\nlocal function drawMetrics()\n    local xpGained = API.GetSkillXP("MINING") - stateXp;\n    API.DrawSquareFilled(imguiBackground)\n    ImGuiTitle.string_value = "Dead\'s Prif Seren Miner " .. version .. "\\n" .. API.ScriptRuntimeString()\n    API.DrawTextAt(ImGuiTitle)\n    if xpGained > 0 then\n        stateXp = stateXp + xpGained;\n        noXpGainTick = 0;\n    else\n        noXpGainTick = noXpGainTick + 1;\n    end\nend\n\n\nlocal function gameStateChecks()\n    UTILS.gameStateChecks()\n    if noXpGainTick > 30 then\n        API.logError(\'Not gaining xp, exiting\')\n        print(\'Not gaining xp\')\n        API.Write_LoopyLoop(false)\n    end\nend\n\nlocal function onStart()\n    print(\'on start\')\n    local priffLodestone = LODESTONES.LODESTONE.PRIFDDINAS.loc\n    local playerXYZ = API.PlayerCoord()\n    if not API.PInArea21(miningArea[1], miningArea[2], miningArea[3], miningArea[4]) and (API.Math_DistanceW(priffLodestone, playerXYZ) > 50) then\n        print(\'Not at stones area or in PRIFDDINAS\')\n        STATE = STATES.GOTO_PRIFF\n    else\n        print(\'Already near PRIFDDINAS lodestone\')\n        STATE = STATES.GOTO_STONES\n    end\nend\n\nlocal function gotoPriff()\n    LODESTONES.Prifddinas()\n    STATE = STATES.GOTO_STONES\nend\n\nlocal function gotoStones()\n    if not API.PInArea21(miningArea[1], miningArea[2], miningArea[3], miningArea[4]) then\n        API.DoAction_WalkerW(WPOINT.new(2232, 3310, 1))\n    end\n    STATE = STATES.MINE_STONES\nend\n\nlocal function mineStones()\n    if not API.CheckAnim(20) then\n        API.DoAction_Object_string1(0x3a, API.OFF_ACT_GeneralObject_route0, { "Seren stone" }, 50, true)\n        UTILS.randomSleep(600)\n        API.WaitUntilMovingEnds()\n    else\n        if forceMine then\n            API.logInfo(\'Force Mine\')\n            API.DoAction_Object_string1(0x3a, API.OFF_ACT_GeneralObject_route0, { "Seren stone" }, 50, true)\n            UTILS.randomSleep(600)\n            forceMine = false\n        end\n    end\nend\n\nlocal function priffSerenMiner()\n    gameStateChecks()\n    drawMetrics()\n    API.DoRandomEvents()\n    if UTILS:antiIdle() then forceMine = true end\n    if STATE == STATES.GOTO_PRIFF then\n        gotoPriff()\n    elseif STATE == STATES.GOTO_STONES then\n        gotoStones()\n    elseif STATE == STATES.MINE_STONES then\n        mineStones()\n    end\n    UTILS.randomSleep(600)\nend\n\n--#endregion\n\n-- Main Loop\nAPI.Write_LoopyLoop(true)\nAPI.logWarn("Dead\'s Priff Seren Stones Started!")\nonStart()\nwhile API.Read_LoopyLoop() do\n    priffSerenMiner()\nend\nAPI.logWarn("Dead\'s Priff Seren Stones Done!")\nAPI.SetDrawTrackedSkills(false)\n'})})})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}}}]);