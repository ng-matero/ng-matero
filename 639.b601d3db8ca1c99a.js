"use strict";(self.webpackChunkng_matero=self.webpackChunkng_matero||[]).push([[639],{7639:(B,m,e)=>{e.r(m),e.d(m,{DesignModule:()=>l});var x=e(8866),d=e(9132),u=e(6617),n=e(4650),p=e(6895),y=e(1299);function C(c,o){if(1&c&&(n.TgZ(0,"span",8),n._uU(1),n.qZA()),2&c){const t=n.oxw(3).$implicit;n.xp6(1),n.Oqu(t.key)}}const T=function(c){return{"m-x-8":c}};function O(c,o){if(1&c&&(n.TgZ(0,"div"),n.YNc(1,C,2,1,"span",6),n.TgZ(2,"span"),n._uU(3),n.qZA(),n._UZ(4,"span",7),n.TgZ(5,"span"),n._uU(6),n.qZA()()),2&c){const t=n.oxw(),a=t.$implicit,f=t.first,v=n.oxw().$implicit;n.MT6("d-flex p-8 bg-",v.key+"-"+a.key," text-",v.value.contrast[a.key],""),n.xp6(1),n.Q6J("ngIf",f),n.xp6(1),n.Tol(n.VKq(9,T,f)),n.xp6(1),n.Oqu(a.key),n.xp6(3),n.Oqu(a.value)}}function Z(c,o){if(1&c&&(n.ynx(0),n.YNc(1,O,7,11,"div",5),n.BQk()),2&c){const t=o.$implicit;n.xp6(1),n.Q6J("ngIf","contrast"!==t.key.toString())}}function k(c,o){if(1&c&&(n.TgZ(0,"div",2)(1,"div",3),n.YNc(2,Z,2,1,"ng-container",4),n.ALo(3,"keyvalue"),n.qZA()()),2&c){const t=o.$implicit,a=n.oxw();n.xp6(2),n.Q6J("ngForOf",n.xi3(3,1,t.value,a.keyAscOrder))}}class s{constructor(){this.colors=[]}valueAscOrder(o,t){return o.value.localeCompare(t.value)}keyAscOrder(o,t){return o.key-t.key}ngOnInit(){const o=u.sb;for(const t of Object.keys(o))this.colors.push({key:t,value:o[t]})}trackByColor(o,t){return t.key}}s.\u0275fac=function(o){return new(o||s)},s.\u0275cmp=n.Xpm({type:s,selectors:[["app-design-colors"]],decls:3,vars:2,consts:[[1,"row"],["class","col-sm-6 col-md-3 col-xl-2",4,"ngFor","ngForOf","ngForTrackBy"],[1,"col-sm-6","col-md-3","col-xl-2"],[1,"b-1","m-b-16"],[4,"ngFor","ngForOf"],[3,"class",4,"ngIf"],["class","text-capitalize",4,"ngIf"],[1,"flex-fill"],[1,"text-capitalize"]],template:function(o,t){1&o&&(n._UZ(0,"breadcrumb"),n.TgZ(1,"div",0),n.YNc(2,k,4,4,"div",1),n.qZA()),2&o&&(n.xp6(2),n.Q6J("ngForOf",t.colors)("ngForTrackBy",t.trackByColor))},dependencies:[p.sg,p.O5,y.L,p.Nd]});var g=e(3546),F=e(7392),_=e(2802);function D(c,o){if(1&c&&(n.TgZ(0,"div",5)(1,"div",6)(2,"mat-icon",7),n._uU(3),n.qZA(),n.TgZ(4,"p",8),n._uU(5),n.qZA()()()),2&c){const t=o.$implicit;n.xp6(3),n.Oqu(t),n.xp6(2),n.Oqu(t)}}function h(c,o){if(1&c&&(n.ynx(0),n.TgZ(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title",2),n._uU(4),n.qZA()(),n.TgZ(5,"mat-card-content")(6,"div",3),n.YNc(7,D,6,2,"div",4),n.qZA()()(),n.BQk()),2&c){const t=o.$implicit;n.xp6(4),n.Oqu(t.key),n.xp6(3),n.Q6J("ngForOf",t.value)}}class i{constructor(){}ngOnInit(){this.icons=u.ci}trackByIcon(o,t){return t.key}}i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=n.Xpm({type:i,selectors:[["app-design-icons"]],decls:3,vars:4,consts:[[1,"bg-purple-500"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"text-capitalize","m-b-16","text-gray-500"],[1,"row"],["class","col-4 col-sm-3 col-md-2 col-xl-1",4,"ngFor","ngForOf"],[1,"col-4","col-sm-3","col-md-2","col-xl-1"],[1,"text-center"],[1,"icon-36"],[1,"f-s-12"]],template:function(o,t){1&o&&(n._UZ(0,"page-header",0),n.YNc(1,h,8,2,"ng-container",1),n.ALo(2,"keyvalue")),2&o&&(n.xp6(1),n.Q6J("ngForOf",n.lcZ(2,2,t.icons))("ngForTrackBy",t.trackByIcon))},dependencies:[p.sg,g.a8,g.dn,g.dk,g.n5,F.Hw,_.q,p.Nd]});const A=[{path:"colors",component:s},{path:"icons",component:i}];class r{}r.\u0275fac=function(o){return new(o||r)},r.\u0275mod=n.oAB({type:r}),r.\u0275inj=n.cJS({imports:[d.Bz.forChild(A),d.Bz]});class l{}l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=n.oAB({type:l}),l.\u0275inj=n.cJS({imports:[x.m,r]})}}]);