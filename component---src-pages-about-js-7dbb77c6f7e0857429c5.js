(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"1AJm":function(e,t,n){e.exports={accordionContainer:"Accordion-module--accordion-container--1M46S",accordionHeader:"Accordion-module--accordion-header--3McVK",content:"Accordion-module--content--2KZLk"}},"1AR6":function(e,t,n){e.exports={projectsContainer:"PersonalProjects-module--projects-container--377uc",lineSeparator:"PersonalProjects-module--line-separator--QN5FT"}},"3XHS":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n.n(r),o=n("Wbzz"),c=n("WlC/"),l=n("k2JI"),i=n("7oih"),s=n("9eSz"),u=n.n(s),m=n("jPpT"),d=n.n(m),p=function(e){var t=e.fixed,n=e.alt;return a.a.createElement("div",null,a.a.createElement(u.a,{className:d.a.roundImage,fixed:t,alt:n}))},f=n("9Koi"),v=n("ma3e"),E=n("1AJm"),b=n.n(E),y=function(e){var t=e.isOpen,n=e.id,r=e.label,o=e.onClick,c=e.children,l=t?{display:"block"}:{};return a.a.createElement("div",{style:l},a.a.createElement("div",{className:b.a.accordionHeader,onClick:function(){return o(n)}},r,a.a.createElement("div",{style:{float:"right"}},!t&&a.a.createElement(v.b,{size:18}),t&&a.a.createElement(v.a,{size:18}))),t&&a.a.createElement("div",{className:b.a.content},c))},h=function(e){var t=e.items,n=function(){var e=Object(r.useState)({}),t=e[0],n=e[1];return[t,function(e,r){var a,o=Object.assign({},t,((a={})[e]=r,a));n(o)}]}(),o=n[0],c=n[1],l=function(e){var t=!!o[e];c(e,!t)};return a.a.createElement("div",{className:b.a.accordionContainer},t.map((function(e){return a.a.createElement(y,{key:e.id,id:e.id,label:e.header,isOpen:!!o[e.id],onClick:l},a.a.createElement("p",{style:{}},e.content),a.a.createElement("div",{style:{marginTop:"8px",marginBottom:"8px"}},e.url&&a.a.createElement("a",{href:e.url},"Source Code")))})))},j=n("1AR6"),O=n.n(j),g=function(){var e=Object(f.a)("projects").t,t=["diversify","tuyo","personal-website"].map((function(t){var n=e(t,{returnObjects:!0});return{id:t,header:n.header,content:n.content,url:n.url}}));return a.a.createElement("div",{className:O.a.projectsContainer},a.a.createElement("h1",{className:O.a.projectsHeader},"Personal Projects"),a.a.createElement(h,{items:t}))},w=n("H1Lj"),x=n.n(w);t.default=function(){var e=Object(o.useStaticQuery)("778934955"),t=Object(c.useTranslation)("about").t;return a.a.createElement(i.a,null,a.a.createElement(l.a,{title:"About"}),a.a.createElement("div",{className:x.a.profileContainer},a.a.createElement("div",{className:x.a.profilePicture},a.a.createElement(p,{fixed:e.file.childImageSharp.fixed,alt:"my photo"})),a.a.createElement("div",{className:x.a.profileDescription},a.a.createElement("h1",null,t("About me")),a.a.createElement("p",null,t("my-description")),a.a.createElement("p",null,t("need-developer")," ",a.a.createElement(o.Link,{to:"/contact"},t("contact-me"))))),a.a.createElement(g,null))}},H1Lj:function(e,t,n){e.exports={profileContainer:"About-module--profile-container--d4Ade",profilePicture:"About-module--profile-picture--38d8B",profileDescription:"About-module--profile-description--SGHdo"}},Lnxd:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n("q1tI"),a=n.n(r),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},c=a.a.createContext&&a.a.createContext(o),l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},i=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function s(e){return function(t){return a.a.createElement(u,l({attr:l({},e.attr)},t),function e(t){return t&&t.map((function(t,n){return a.a.createElement(t.tag,l({key:n},t.attr),e(t.child))}))}(e.child))}}function u(e){var t=function(t){var n,r=e.attr,o=e.size,c=e.title,s=i(e,["attr","size","title"]),u=o||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),a.a.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,r,s,{className:n,style:l(l({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),c&&a.a.createElement("title",null,c),e.children)};return void 0!==c?a.a.createElement(c.Consumer,null,(function(e){return t(e)})):t(o)}},jPpT:function(e,t,n){e.exports={roundImage:"RoundImage-module--round-image--1pKw0"}}}]);
//# sourceMappingURL=component---src-pages-about-js-7dbb77c6f7e0857429c5.js.map