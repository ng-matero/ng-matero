import{b as T,c as F,d as S,g as E,j as O}from"./chunk-GPAZGZBE.js";import{Gc as b,Hc as B,Lc as $,Oc as w,Pc as A}from"./chunk-Y3TE4HCF.js";import{Ad as y,Fc as c,Gc as l,Hc as h,Jb as d,Qb as x,Tc as v,Uc as M,Vc as D,Zb as _,ac as g,bc as k,dc as I,fc as f,gc as p,hc as s,ic as r,jc as o,kc as u,tc as C,ub as n}from"./chunk-CDJ2EF3V.js";function K(t,a){if(t&1&&(r(0,"div")(1,"span"),c(2),o(),u(3,"span",4),r(4,"span"),c(5),o()()),t&2){let e=C().$implicit,i=C().$implicit;g("d-flex p-8 bg-",i.key+"-"+e.key,""),_("text-light",e.key<=60)("text-dark",e.key>60),n(2),l(e.key),n(3),l(e.value)}}function V(t,a){if(t&1&&x(0,K,6,9,"div",3),t&2){let e=a.$implicit;I(e.key>0&&e.key<100?0:-1)}}function j(t,a){if(t&1&&(r(0,"div",1)(1,"div",2)(2,"div"),c(3),o(),p(4,V,1,1,null,null,f),v(6,"keyvalue"),o()()),t&2){let e=a.$implicit,i=C();n(2),k("p-8 text-capitalize text-",e.key,"-95 bg-",e.key,"-10"),n(),h(" ",e.key," "),n(),s(D(6,5,e.value,i.keyAscOrder))}}var P=(()=>{class t{constructor(){this.colors=[]}valueAscOrder(e,i){return e.value.localeCompare(i.value)}keyAscOrder(e,i){return e.key-i.key}ngOnInit(){let e=w;for(let i of Object.keys(e))this.colors.push({key:i,value:e[i]})}trackByColor(e,i){return i.key}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-design-colors"]],decls:3,vars:0,consts:[[1,"row"],[1,"col-sm-6","col-md-3","col-xl-2"],[1,"b-1","m-b-16","r-16","overflow-hidden"],[3,"class","text-light","text-dark"],[1,"flex-fill"]],template:function(i,m){i&1&&(r(0,"div",0),p(1,j,7,8,"div",1,m.trackByColor,!0),o()),i&2&&(n(),s(m.colors))},dependencies:[y],encapsulation:2})}}return t})();function L(t,a){if(t&1&&(r(0,"div",3)(1,"div",4)(2,"mat-icon"),c(3),o(),r(4,"p",5),c(5),o()()()),t&2){let e=a.$implicit;n(3),l(e),n(2),l(e)}}function N(t,a){if(t&1&&(r(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title",1),c(3),o()(),r(4,"mat-card-content")(5,"div",2),p(6,L,6,2,"div",3,f),o()()()),t&2){let e=a.$implicit;n(3),l(e.key),n(3),s(e.value)}}var z=(()=>{class t{ngOnInit(){this.icons=A}trackByIcon(e,i){return i.key}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-design-icons"]],decls:4,vars:2,consts:[[1,"bg-magenta-40"],[1,"text-capitalize","m-b-16","text-gray-500"],[1,"row"],[1,"col-4","col-sm-3","col-md-2","col-xl-1"],[1,"text-center","m-t-12","m-b-24"],[1,"f-s-12"]],template:function(i,m){i&1&&(u(0,"page-header",0),p(1,N,8,1,"mat-card",null,m.trackByIcon,!0),v(3,"keyvalue")),i&2&&(n(),s(M(3,0,m.icons)))},dependencies:[y,O,T,S,E,F,B,b,$],encapsulation:2})}}return t})();var ie=[{path:"colors",component:P},{path:"icons",component:z}];export{ie as routes};
