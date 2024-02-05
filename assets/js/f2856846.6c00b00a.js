"use strict";(self.webpackChunkdeadcodes=self.webpackChunkdeadcodes||[]).push([[320],{5448:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>s,default:()=>I,frontMatter:()=>c,metadata:()=>h,toc:()=>f});var a=t(7624),i=t(2172),o=(t(1504),t(3940)),r=t(9188),l=t(9460);t(9080);const d=JSON.parse('[{"date":"2024-01-02","title":"Release","importance":"primary","items":["Release"]}]'),c={title:"DeadButterfly",description:"Catches Butterflies",slug:"/dead-butterfly"},s=void 0,h={id:"Scripts/butterfly/index",title:"DeadButterfly",description:"Catches Butterflies",source:"@site/docs/Scripts/butterfly/index.md",sourceDirName:"Scripts/butterfly",slug:"/dead-butterfly",permalink:"/dead-butterfly",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"DeadButterfly",description:"Catches Butterflies",slug:"/dead-butterfly"},sidebar:"kbSidebar",previous:{title:"Tree Chopper",permalink:"/dead-prif-trees"},next:{title:"DeadDigger",permalink:"/dead-digger"}},u={},f=[{value:"Features",id:"features",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Changelog",id:"changelog",level:2},{value:"Code",id:"code",level:2}];function m(e){const n={admonition:"admonition",code:"code",h2:"h2",li:"li",pre:"pre",ul:"ul",...(0,i.M)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.c,{title:"Dead Butterfly",version:"2023.11",skill:"Hunter"}),"\n",(0,a.jsx)(n.admonition,{type:"hidden",children:(0,a.jsx)(n.h2,{id:"features",children:"Features"})}),"\n",(0,a.jsx)(r.c,{title:"Features",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"The tile your character was standing on when you started the script is considered as Home Tile"}),"\n",(0,a.jsx)(n.li,{children:"If it detects that you're losing health, it runs back to the Home Tile."}),"\n",(0,a.jsx)(n.li,{children:"If you wander too far from the Home Tile, it goes back to the Home Tile."}),"\n"]})}),"\n",(0,a.jsx)(n.admonition,{type:"hidden",children:(0,a.jsx)(n.h2,{id:"configuration",children:"Configuration"})}),"\n",(0,a.jsx)(r.c,{title:"Configuration",children:(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Set the name of the entity you want to catch on line 9"}),"\n"]})}),"\n",(0,a.jsx)(n.admonition,{type:"hidden",children:(0,a.jsx)(n.h2,{id:"changelog",children:"Changelog"})}),"\n",(0,a.jsx)(l.c,{changes:d}),"\n",(0,a.jsx)(n.admonition,{type:"hidden",children:(0,a.jsx)(n.h2,{id:"code",children:"Code"})}),"\n",(0,a.jsx)(r.c,{title:"Code",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-lua",metastring:"showLineNumbers",children:"local API = require(\"api\")\nlocal UTILS = require(\"utils\")\n\nAPI.SetDrawLogs(true)\nAPI.SetDrawTrackedSkills(true)\n\nprint(\"Dead's Butterfly Catcher started\")\nAPI.logInfo(\"Dead's Butterfly Catcher started\")\n--highlight-next-line\nlocal entityToCatch = \"Charming moth\"           -- Set this value\nlocal startTime, afk = os.time(), os.time()\nlocal MAX_IDLE_TIME_MINUTES = 5\nlocal failureCount = 0\nlocal startTile = API.PlayerCoord()\nlocal health = API.GetHP_()\n\nlocal function idleCheck()\n    local timeDiff = os.difftime(os.time(), afk)\n    local randomTime = math.random((MAX_IDLE_TIME_MINUTES * 60) * 0.6, (MAX_IDLE_TIME_MINUTES * 60) * 0.9)\n\n    if timeDiff > randomTime then\n        API.PIdle2()\n        afk = os.time()\n        return true\n    end\nend\n\nlocal function gameStateChecks()\n    local gameState = API.GetGameState()\n    if (gameState ~= 3) then\n        API.logError('Not ingame with state:' .. tostring(gameState))\n        API.Write_LoopyLoop(false)\n        return\n    end\n    if API.InvFull_() then\n        API.logError('inventory full, stopping')\n        API.Write_LoopyLoop(false)\n        return\n    end\n    if failureCount > 50 then\n        API.logError('Couldnt find moths more than 50 times, exiting')\n        API.Write_LoopyLoop(false)\n    end\nend\n\nlocal function walkBack()\n    API.DoAction_WalkerW(startTile);\nend\n\nlocal function runBackIfUnderAttack()\n    local currentHealth = API.GetHP_()\n    if currentHealth < health then\n        API.logWarn('Were under attack, running back to start point')\n        if not API.ReadPlayerMovin2() then\n            walkBack()\n            health = currentHealth\n        end\n    elseif currentHealth > health then\n        health = currentHealth\n    end\nend\n\nlocal function CatchAButterfly()\n    local interactingWithMoth = API.Local_PlayerInterActingWith_22(20, entityToCatch)\n    if not (interactingWithMoth or API.ReadPlayerAnim() ~= 0) and not API.ReadPlayerMovin2() then\n        local moth = API.FindNPCbyName(entityToCatch, 30)\n        if moth ~= nil and moth.Id ~= 0 then\n            if API.Math_DistanceF(moth.Tile_XYZ, API.PlayerCoordfloat()) > 50 then\n            API.logInfo('Too far from target, walking back')\n                API.DoAction_WalkerF(moth.Tile_XYZ)\n            end\n            API.DoAction_NPC(0x29, API.OFF_ACT_InteractNPC_route, {moth.Id}, 50)\n        else\n            if API.Math_DistanceW(startTile, API.PlayerCoord()) > 50 then\n            API.logInfo('Wandered off, going back')\n                walkBack()\n            end\n            failureCount  = failureCount + 1\n        end\n        failureCount = 0\n        UTILS.randomSleep(300)\n    else\n        runBackIfUnderAttack()\n    end\nend\nAPI.logInfo('Starting to catch:' .. entityToCatch)\nAPI.Write_LoopyLoop(true)\nwhile API.Read_LoopyLoop() do\n    gameStateChecks()\n    idleCheck()\n    runBackIfUnderAttack()\n    API.DoRandomEvents()\n    CatchAButterfly()\n    UTILS.randomSleep(300)\nend\n"})})})]})}function I(e={}){const{wrapper:n}={...(0,i.M)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}}}]);