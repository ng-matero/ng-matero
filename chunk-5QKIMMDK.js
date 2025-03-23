import{e as T,f as A,g as b}from"./chunk-36PIL6T2.js";import{E as u,ca as E,fa as M}from"./chunk-KE6KFSVW.js";import{Ib as c,Jb as $,Jc as R,Kb as y,Ta as h,Ub as w,gc as m,hc as p,la as I,na as G,qa as l,rc as f,sc as d,vc as x,xc as v,yc as S}from"./chunk-B3XC7Y5W.js";var _=class{tracker;columnIndex=0;rowIndex=0;get rowCount(){return this.rowIndex+1}get rowspan(){let e=Math.max(...this.tracker);return e>1?this.rowCount+e-1:this.rowCount}positions;update(e,t){this.columnIndex=0,this.rowIndex=0,this.tracker=new Array(e),this.tracker.fill(0,0,this.tracker.length),this.positions=t.map(i=>this._trackTile(i))}_trackTile(e){let t=this._findMatchingGap(e.colspan);return this._markTilePosition(t,e),this.columnIndex=t+e.colspan,new z(this.rowIndex,t)}_findMatchingGap(e){e>this.tracker.length;let t=-1,i=-1;do{if(this.columnIndex+e>this.tracker.length){this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),i=this._findGapEndIndex(t);continue}if(t=this.tracker.indexOf(0,this.columnIndex),t==-1){this._nextRow(),t=this.tracker.indexOf(0,this.columnIndex),i=this._findGapEndIndex(t);continue}i=this._findGapEndIndex(t),this.columnIndex=t+1}while(i-t<e||i==0);return Math.max(t,0)}_nextRow(){this.columnIndex=0,this.rowIndex++;for(let e=0;e<this.tracker.length;e++)this.tracker[e]=Math.max(0,this.tracker[e]-1)}_findGapEndIndex(e){for(let t=e+1;t<this.tracker.length;t++)if(this.tracker[t]!=0)return t;return this.tracker.length}_markTilePosition(e,t){for(let i=0;i<t.colspan;i++)this.tracker[e+i]=t.rowspan}},z=class{row;col;constructor(e,t){this.row=e,this.col=t}};var L=["*"],F=[[["","mat-grid-avatar",""],["","matGridAvatar",""]],[["","mat-line",""],["","matLine",""]],"*"],B=["[mat-grid-avatar], [matGridAvatar]","[mat-line], [matLine]","*"],Q=".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}",j=new G("MAT_GRID_LIST"),O=(()=>{class r{_element=l(h);_gridList=l(j,{optional:!0});_rowspan=1;_colspan=1;constructor(){}get rowspan(){return this._rowspan}set rowspan(t){this._rowspan=Math.round(u(t))}get colspan(){return this._colspan}set colspan(t){this._colspan=Math.round(u(t))}_setStyle(t,i){this._element.nativeElement.style[t]=i}static \u0275fac=function(i){return new(i||r)};static \u0275cmp=c({type:r,selectors:[["mat-grid-tile"]],hostAttrs:[1,"mat-grid-tile"],hostVars:2,hostBindings:function(i,o){i&2&&w("rowspan",o.rowspan)("colspan",o.colspan)},inputs:{rowspan:"rowspan",colspan:"colspan"},exportAs:["matGridTile"],ngContentSelectors:L,decls:2,vars:0,consts:[[1,"mat-grid-tile-content"]],template:function(i,o){i&1&&(f(),m(0,"div",0),d(1),p())},styles:[".mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-header{font-size:var(--mat-grid-list-tile-header-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-header .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-header-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-footer{font-size:var(--mat-grid-list-tile-footer-primary-text-size, var(--mat-sys-body-large))}.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:var(--mat-grid-list-tile-footer-secondary-text-size, var(--mat-sys-body-medium))}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}"],encapsulation:2,changeDetection:0})}return r})(),at=(()=>{class r{_element=l(h);_lines;constructor(){}ngAfterContentInit(){A(this._lines,this._element)}static \u0275fac=function(i){return new(i||r)};static \u0275cmp=c({type:r,selectors:[["mat-grid-tile-header"],["mat-grid-tile-footer"]],contentQueries:function(i,o,s){if(i&1&&x(s,T,5),i&2){let n;v(n=S())&&(o._lines=n)}},ngContentSelectors:B,decls:4,vars:0,consts:[[1,"mat-grid-list-text"]],template:function(i,o){i&1&&(f(F),d(0),m(1,"div",0),d(2,1),p(),d(3,2))},encapsulation:2,changeDetection:0})}return r})();var lt=(()=>{class r{static \u0275fac=function(i){return new(i||r)};static \u0275dir=y({type:r,selectors:[["mat-grid-tile-header"]],hostAttrs:[1,"mat-grid-tile-header"]})}return r})(),dt=(()=>{class r{static \u0275fac=function(i){return new(i||r)};static \u0275dir=y({type:r,selectors:[["mat-grid-tile-footer"]],hostAttrs:[1,"mat-grid-tile-footer"]})}return r})(),V=/^-?\d+((\.\d+)?[A-Za-z%$]?)+$/,g=class{_gutterSize;_rows=0;_rowspan=0;_cols;_direction;init(e,t,i,o){this._gutterSize=P(e),this._rows=t.rowCount,this._rowspan=t.rowspan,this._cols=i,this._direction=o}getBaseTileSize(e,t){return`(${e}% - (${this._gutterSize} * ${t}))`}getTilePosition(e,t){return t===0?"0":a(`(${e} + ${this._gutterSize}) * ${t}`)}getTileSize(e,t){return`(${e} * ${t}) + (${t-1} * ${this._gutterSize})`}setStyle(e,t,i){let o=100/this._cols,s=(this._cols-1)/this._cols;this.setColStyles(e,i,o,s),this.setRowStyles(e,t,o,s)}setColStyles(e,t,i,o){let s=this.getBaseTileSize(i,o),n=this._direction==="rtl"?"right":"left";e._setStyle(n,this.getTilePosition(s,t)),e._setStyle("width",a(this.getTileSize(s,e.colspan)))}getGutterSpan(){return`${this._gutterSize} * (${this._rowspan} - 1)`}getTileSpan(e){return`${this._rowspan} * ${this.getTileSize(e,1)}`}getComputedHeight(){return null}},k=class extends g{fixedRowHeight;constructor(e){super(),this.fixedRowHeight=e}init(e,t,i,o){super.init(e,t,i,o),this.fixedRowHeight=P(this.fixedRowHeight),V.test(this.fixedRowHeight)}setRowStyles(e,t){e._setStyle("top",this.getTilePosition(this.fixedRowHeight,t)),e._setStyle("height",a(this.getTileSize(this.fixedRowHeight,e.rowspan)))}getComputedHeight(){return["height",a(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)]}reset(e){e._setListStyle(["height",null]),e._tiles&&e._tiles.forEach(t=>{t._setStyle("top",null),t._setStyle("height",null)})}},C=class extends g{rowHeightRatio;baseTileHeight;constructor(e){super(),this._parseRatio(e)}setRowStyles(e,t,i,o){let s=i/this.rowHeightRatio;this.baseTileHeight=this.getBaseTileSize(s,o),e._setStyle("marginTop",this.getTilePosition(this.baseTileHeight,t)),e._setStyle("paddingTop",a(this.getTileSize(this.baseTileHeight,e.rowspan)))}getComputedHeight(){return["paddingBottom",a(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)]}reset(e){e._setListStyle(["paddingBottom",null]),e._tiles.forEach(t=>{t._setStyle("marginTop",null),t._setStyle("paddingTop",null)})}_parseRatio(e){let t=e.split(":");t.length,this.rowHeightRatio=parseFloat(t[0])/parseFloat(t[1])}},D=class extends g{setRowStyles(e,t){let i=100/this._rowspan,o=(this._rows-1)/this._rows,s=this.getBaseTileSize(i,o);e._setStyle("top",this.getTilePosition(s,t)),e._setStyle("height",a(this.getTileSize(s,e.rowspan)))}reset(e){e._tiles&&e._tiles.forEach(t=>{t._setStyle("top",null),t._setStyle("height",null)})}};function a(r){return`calc(${r})`}function P(r){return r.match(/([A-Za-z%]+)$/)?r:`${r}px`}var N="fit",gt=(()=>{class r{_element=l(h);_dir=l(E,{optional:!0});_cols;_tileCoordinator;_rowHeight;_gutter="1px";_tileStyler;_tiles;constructor(){}get cols(){return this._cols}set cols(t){this._cols=Math.max(1,Math.round(u(t)))}get gutterSize(){return this._gutter}set gutterSize(t){this._gutter=`${t??""}`}get rowHeight(){return this._rowHeight}set rowHeight(t){let i=`${t??""}`;i!==this._rowHeight&&(this._rowHeight=i,this._setTileStyler(this._rowHeight))}ngOnInit(){this._checkCols(),this._checkRowHeight()}ngAfterContentChecked(){this._layoutTiles()}_checkCols(){this.cols}_checkRowHeight(){this._rowHeight||this._setTileStyler("1:1")}_setTileStyler(t){this._tileStyler&&this._tileStyler.reset(this),t===N?this._tileStyler=new D:t&&t.indexOf(":")>-1?this._tileStyler=new C(t):this._tileStyler=new k(t)}_layoutTiles(){this._tileCoordinator||(this._tileCoordinator=new _);let t=this._tileCoordinator,i=this._tiles.filter(s=>!s._gridList||s._gridList===this),o=this._dir?this._dir.value:"ltr";this._tileCoordinator.update(this.cols,i),this._tileStyler.init(this.gutterSize,t,this.cols,o),i.forEach((s,n)=>{let H=t.positions[n];this._tileStyler.setStyle(s,H.row,H.col)}),this._setListStyle(this._tileStyler.getComputedHeight())}_setListStyle(t){t&&(this._element.nativeElement.style[t[0]]=t[1])}static \u0275fac=function(i){return new(i||r)};static \u0275cmp=c({type:r,selectors:[["mat-grid-list"]],contentQueries:function(i,o,s){if(i&1&&x(s,O,5),i&2){let n;v(n=S())&&(o._tiles=n)}},hostAttrs:[1,"mat-grid-list"],hostVars:1,hostBindings:function(i,o){i&2&&w("cols",o.cols)},inputs:{cols:"cols",gutterSize:"gutterSize",rowHeight:"rowHeight"},exportAs:["matGridList"],features:[R([{provide:j,useExisting:r}])],ngContentSelectors:L,decls:2,vars:0,template:function(i,o){i&1&&(f(),m(0,"div"),d(1),p())},styles:[Q],encapsulation:2,changeDetection:0})}return r})(),ht=(()=>{class r{static \u0275fac=function(i){return new(i||r)};static \u0275mod=$({type:r});static \u0275inj=I({imports:[b,M,b,M]})}return r})();export{O as a,at as b,lt as c,dt as d,gt as e,ht as f};
