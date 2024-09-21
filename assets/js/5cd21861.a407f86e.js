"use strict";(self.webpackChunkdeadcodes=self.webpackChunkdeadcodes||[]).push([[188],{6568:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>f});var t=i(7624),s=i(2172),c=(i(1504),i(9188)),r=i(9080);const a={title:"Interfaces",description:"How to find interfaces"},d=void 0,l={id:"Guides/ME/02interfaces",title:"Interfaces",description:"How to find interfaces",source:"@site/docs/Guides/ME/02interfaces.md",sourceDirName:"Guides/ME",slug:"/Guides/ME/02interfaces",permalink:"/Guides/ME/02interfaces",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Interfaces",description:"How to find interfaces"},sidebar:"guideSidebar",previous:{title:"Getting Started",permalink:"/Guides/ME/01gettingStarted"}},o={},f=[{value:"Opening Interface Debugger",id:"opening-interface-debugger",level:2},{value:"Interface Options",id:"interface-options",level:2},{value:"Finding Interfaces",id:"finding-interfaces",level:2},{value:"Using Interface Values",id:"using-interface-values",level:2}];function h(e){const n={admonition:"admonition",code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.M)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.admonition,{type:"hidden",children:(0,t.jsx)(n.h2,{id:"opening-interface-debugger",children:"Opening Interface Debugger"})}),"\n",(0,t.jsxs)(c.c,{title:"Opening Interface Debugger",children:[(0,t.jsx)(n.p,{children:"You can open the interface debugger by performing the following actions on the debug menu"}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Click ",(0,t.jsx)(n.code,{children:">"})]}),"\n",(0,t.jsxs)(n.li,{children:["Click ",(0,t.jsx)(n.code,{children:"Interfaces"})]}),"\n"]}),(0,t.jsx)(r.c,{url:"Opening interface debug",children:(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Opening interface debug",src:i(2256).c+"",width:"1042",height:"59"})})})]}),"\n",(0,t.jsx)(n.admonition,{type:"hidden",children:(0,t.jsx)(n.h2,{id:"interface-options",children:"Interface Options"})}),"\n",(0,t.jsxs)(c.c,{title:"Interface Options",children:[(0,t.jsx)(n.p,{children:"This will now open up the interfaces window"}),(0,t.jsx)(r.c,{url:"Interface Options",children:(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Interfaces window",src:i(7532).c+"",width:"559",height:"341"})})})]}),"\n",(0,t.jsx)(n.admonition,{type:"hidden",children:(0,t.jsx)(n.h2,{id:"finding-interfaces",children:"Finding Interfaces"})}),"\n",(0,t.jsxs)(c.c,{title:"Finding Interfaces",children:[(0,t.jsxs)(n.p,{children:["The simplest way to find interfaces, is using the ",(0,t.jsx)(n.code,{children:"FilterText"})," option."]}),(0,t.jsx)(r.c,{url:"Finding Interfaces by visible text",children:(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Finding interfaces",src:i(2692).c+"",width:"1544",height:"1109"})})}),(0,t.jsx)(n.p,{children:"The console out for the above action is below:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-lua",children:"Current: 1477:704:14:704 Index: 4\nFull path:  : 17fcdef9450 : 17fcddfe650 : 17fcddfa050 : 17fcddfe850 : 17fc69f8e10\nCurrent IDs: 1477:704:14:704\nFull IDs: { { 1477,25,-1,-1,0 }, { 1477,699,-1,25,0 }, { 1477,700,-1,699,0 }, { 1477,704,-1,700,0 }, { 1477,704,14,704,0 } }\n"})})]}),"\n",(0,t.jsx)(n.admonition,{type:"hidden",children:(0,t.jsx)(n.h2,{id:"using-interface-values",children:"Using Interface Values"})}),"\n",(0,t.jsxs)(c.c,{title:"Using Interface Values",children:[(0,t.jsx)(n.p,{children:"Now that we have an interface ID, let's see how to use the values in your scripts."}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-lua",metastring:"showLineNumbers",children:"--[[\n    We have to create a table of InterfaceComp5\n    for every single element in the full path \n\n    {\n        { 1477,25,-1,-1,0 },\n        { 1477,699,-1,25,0 },\n        { 1477,700,-1,699,0 },\n        { 1477,704,-1,700,0 },\n        { 1477,704,14,704,0 }\n    }\n]]\n\nlocal customisationInterface = {\n    InterfaceComp5.new(1477,25,-1,-1,0),\n    InterfaceComp5.new(1477,699,-1,25,0),\n    InterfaceComp5.new(1477,700,-1,699,0),\n    InterfaceComp5.new(1477,704,-1,700,0),\n    InterfaceComp5.new(1477,704,14,704,0),\n}\n\n--[[\n    We will then call API.ScanForInterfaceTest2Get\n    with the table we created.\n    The first argument is a boolean which says\n    if we have to scan the child interfaces or not.\n\n    In this function, we're checking if we find any interfaces\n    with the hierarchy that we requested for and\n    returning true if we did.\n]]\nlocal function isCustomisationInterfacePresent()\n    local result = API.ScanForInterfaceTest2Get(true, customisationInterface)\n    if #result > 0 then\n        return true\n    else return false end\nend\n\n"})})]})]})}function u(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},2692:(e,n,i)=>{i.d(n,{c:()=>t});const t=i.p+"assets/images/InterfaceDebug-aa83963f8f9f8c97fefeb90d89f228a9.gif"},7532:(e,n,i)=>{i.d(n,{c:()=>t});const t=i.p+"assets/images/interfaces_window-89783d02296d3f625584e841f2d6fcb1.png"},2256:(e,n,i)=>{i.d(n,{c:()=>t});const t=i.p+"assets/images/open_interface-a9da73c88bcfac37617fdc4cd340d0f9.png"}}]);