"use strict";(self.webpackChunkng_matero=self.webpackChunkng_matero||[]).push([[701],{78938:function(t,n,e){e.r(n),e.d(n,{DesignModule:function(){return w}});var r=e(38441),c=e(63423),o=e(37716);let i=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac}),t})();var s=e(93929),a=e(41299),f=e(35618),l=e(38583);function u(t,n){if(1&t&&(o.TgZ(0,"span",8),o._uU(1),o.qZA()),2&t){const t=o.oxw(3).$implicit;o.xp6(1),o.Oqu(t.key)}}function p(t,n){if(1&t&&(o.TgZ(0,"div"),o.YNc(1,u,2,1,"span",6),o.TgZ(2,"span"),o._uU(3),o.qZA(),o._UZ(4,"span",7),o.TgZ(5,"span"),o._uU(6),o.qZA(),o.qZA()),2&t){const t=o.oxw(),n=t.$implicit,e=t.first,r=o.oxw().$implicit;o.MT6("bg-",r.key+"-"+n.key," text-",r.value.contrast[n.key]," p-8"),o.xp6(1),o.Q6J("ngIf",e),o.xp6(2),o.Oqu(n.key),o.xp6(3),o.Oqu(n.value)}}function x(t,n){if(1&t&&(o.ynx(0),o.YNc(1,p,7,7,"div",5),o.BQk()),2&t){const t=n.$implicit;o.xp6(1),o.Q6J("ngIf","contrast"!==t.key.toString())}}function g(t,n){if(1&t&&(o.TgZ(0,"div",2),o.TgZ(1,"div",3),o.YNc(2,x,2,1,"ng-container",4),o.ALo(3,"keyvalue"),o.qZA(),o.qZA()),2&t){const t=n.$implicit,e=o.oxw();o.xp6(2),o.Q6J("ngForOf",o.xi3(3,1,t.value,e.keyAscOrder))}}let m=(()=>{class t{constructor(t){this.colorsSrv=t,this.colors=[]}valueAscOrder(t,n){return t.value.localeCompare(n.value)}keyAscOrder(t,n){return t.key-n.key}ngOnInit(){const t=s.sb;for(const n of Object.keys(t))this.colors.push({key:n,value:t[n]})}trackByColor(t,n){return n.key}}return t.\u0275fac=function(n){return new(n||t)(o.Y36(i))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-design-colors"]],features:[o._Bn([i])],decls:3,vars:2,consts:[["fxLayout","row wrap","fxLayoutGap","16px grid"],["fxFlex.gt-md","20","fxFlex.gt-sm","25","fxFlex.gt-xs","50","fxFlex","100",4,"ngFor","ngForOf","ngForTrackBy"],["fxFlex.gt-md","20","fxFlex.gt-sm","25","fxFlex.gt-xs","50","fxFlex","100"],[1,"b-1"],[4,"ngFor","ngForOf"],[3,"class",4,"ngIf"],["class","m-r-4 text-capitalize",4,"ngIf"],["fxFlex",""],[1,"m-r-4","text-capitalize"]],template:function(t,n){1&t&&(o._UZ(0,"breadcrumb"),o.TgZ(1,"div",0),o.YNc(2,g,4,4,"div",1),o.qZA()),2&t&&(o.xp6(2),o.Q6J("ngForOf",n.colors)("ngForTrackBy",n.trackByColor))},directives:[a.L,f.xw,f.SQ,l.sg,f.yH,l.O5],pipes:[l.Nd],encapsulation:2}),t})(),d=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac}),t})();var y=e(32802),Z=e(93738),k=e(76627);function F(t,n){if(1&t&&(o.TgZ(0,"div",5),o.TgZ(1,"div",6),o.TgZ(2,"mat-icon",7),o._uU(3),o.qZA(),o.TgZ(4,"p",8),o._uU(5),o.qZA(),o.qZA(),o.qZA()),2&t){const t=n.$implicit;o.xp6(3),o.Oqu(t),o.xp6(2),o.Oqu(t)}}function v(t,n){if(1&t&&(o.ynx(0),o.TgZ(1,"mat-card"),o.TgZ(2,"mat-card-title",2),o._uU(3),o.qZA(),o.TgZ(4,"mat-card-content"),o.TgZ(5,"div",3),o.YNc(6,F,6,2,"div",4),o.qZA(),o.qZA(),o.qZA(),o.BQk()),2&t){const t=n.$implicit;o.xp6(3),o.hij("",t.key," "),o.xp6(3),o.Q6J("ngForOf",t.value)}}const A=[{path:"colors",component:m},{path:"icons",component:(()=>{class t{constructor(t){this.iconsSrv=t}ngOnInit(){this.icons=s.ci}trackByIcon(t,n){return n.key}}return t.\u0275fac=function(n){return new(n||t)(o.Y36(d))},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-design-icons"]],features:[o._Bn([d])],decls:3,vars:4,consts:[[1,"bg-purple-500"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"mat-h1","f-w-300","text-capitalize","m-b-16","text-gray-500"],["fxLayout","row wrap","fxLayoutGap","16px grid"],["fxFlex.gt-md","11.11","fxFlex.md","20","fxFlex.sm","25","fxFlex.xs","33.33",4,"ngFor","ngForOf"],["fxFlex.gt-md","11.11","fxFlex.md","20","fxFlex.sm","25","fxFlex.xs","33.33"],[1,"text-center"],[1,"icon-36"],[1,"f-s-12"]],template:function(t,n){1&t&&(o._UZ(0,"page-header",0),o.YNc(1,v,7,2,"ng-container",1),o.ALo(2,"keyvalue")),2&t&&(o.xp6(1),o.Q6J("ngForOf",o.lcZ(2,2,n.icons))("ngForTrackBy",n.trackByIcon))},directives:[y.q,l.sg,Z.a8,Z.n5,Z.dn,f.xw,f.SQ,f.yH,k.Hw],pipes:[l.Nd],encapsulation:2}),t})()}];let q=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[c.Bz.forChild(A)],c.Bz]}),t})(),w=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[[r.m,q]]}),t})()}}]);