import{Br as Z,Cr as XM,D as C,Da as le,Do as u,Dt as IL,En as PM,F as D,Fa as me,Fi as ee,Ji as ge,Jn as Si,Lo as ve,M as Cn,P as Ct,Qn as T,Ri as eo,Rn as R,Ui as g,W as Dt,Wa as nt,X as Ee,Xt as Le,_n as Oe,_r as W,_t as H,bn as Os,cs as xn,d as A,go as rr,ha as k$1,hs as ye,is as xd,ki as dt$1,la as jH,ls as xse,m as Ae,ma as jn,nn as Me,no as pt$1,r as $M}from"./chunk-BxOUbbz1.js";import{F as Le$1,I as f$1,L as he,R as se,z as u$1}from"./main-RA37A7JB.js";var _=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration;bindings};var k=`mdc-dialog--open`;var ot=`mdc-dialog--opening`;var lt=`mdc-dialog--closing`;var ut=150;var pt=75;var ft=(()=>{class t extends se{_animationStateChanged=new H;_animationsEnabled=!xn();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?rt(this._config.enterAnimationDuration)??ut:0;_exitAnimationDuration=this._animationsEnabled?rt(this._config.exitAnimationDuration)??pt:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:`opening`,totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(st,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(ot,k)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(k),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:`closing`,totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(k),this._animationsEnabled?(this._hostElement.style.setProperty(st,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(lt)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(n){this._actionSectionCount+=n,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:`closed`,totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(ot,lt)}_waitForAnimationToComplete(n,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,n)}_requestAnimationFrame(n){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame==`function`?requestAnimationFrame(n):n()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(n){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:`opened`,totalTime:n})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(n){let i=super.attachComponentPortal(n);return i.location.nativeElement.classList.add(`mat-mdc-dialog-component-host`),i}static ɵfac=(()=>{let n;return function(a){return(n||(n=nt(t)))(a||t)}})();static ɵcmp=(function(){function n(i,a){}return W({type:t,selectors:[[`mat-dialog-container`]],hostAttrs:[`tabindex`,`-1`,1,`mat-mdc-dialog-container`,`mdc-dialog`],hostVars:10,hostBindings:function(a,l){a&2&&(rr(`id`,l._config.id),Oe(`aria-modal`,l._config.ariaModal)(`role`,l._config.role)(`aria-labelledby`,l._config.ariaLabel?null:l._ariaLabelledByQueue[0])(`aria-label`,l._config.ariaLabel)(`aria-describedby`,l._config.ariaDescribedBy||null),ve(`_mat-animation-noopable`,!l._animationsEnabled)(`mat-mdc-dialog-container-with-actions`,l._actionSectionCount>0))},features:[Ae],decls:3,vars:0,consts:[[1,`mat-mdc-dialog-inner-container`,`mdc-dialog__container`],[1,`mat-mdc-dialog-surface`,`mdc-dialog__surface`],[`cdkPortalOutlet`,``]],template:function(a,l){a&1&&(D(0,`div`,0)(1,`div`,1),ge(2,n,0,0,`ng-template`,2),T()())},dependencies:[xse],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--%NS%mat-dialog-container-max-width, 560px);
  min-width: var(--%NS%mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--%NS%mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--%NS%mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--%NS%mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--%NS%mat-dialog-container-elevation-shadow, none);
  border-radius: var(--%NS%mat-dialog-container-shape, var(--%NS%mat-sys-corner-extra-large, 4px));
  background-color: var(--%NS%mat-dialog-container-color, var(--%NS%mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--%NS%mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--%NS%mat-dialog-subhead-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-dialog-subhead-font, var(--%NS%mat-sys-headline-small-font, inherit));
  line-height: var(--%NS%mat-dialog-subhead-line-height, var(--%NS%mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-subhead-size, var(--%NS%mat-sys-headline-small-size, 1rem));
  font-weight: var(--%NS%mat-dialog-subhead-weight, var(--%NS%mat-sys-headline-small-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-subhead-tracking, var(--%NS%mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--%NS%mat-dialog-supporting-text-color, var(--%NS%mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--%NS%mat-dialog-supporting-text-font, var(--%NS%mat-sys-body-medium-font, inherit));
  line-height: var(--%NS%mat-dialog-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 1rem));
  font-weight: var(--%NS%mat-dialog-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--%NS%mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--%NS%mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})})()}return t})();var st=`--mat-dialog-transition-duration`;function rt(t){return t==null?null:typeof t==`number`?t:t.endsWith(`ms`)?Os(t.substring(0,t.length-2)):t.endsWith(`s`)?Os(t.substring(0,t.length-1))*1e3:t===`0`?0:null}var f=(function(t){return t[t.OPEN=0]=`OPEN`,t[t.CLOSING=1]=`CLOSING`,t[t.CLOSED=2]=`CLOSED`,t})(f||{});var c=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new eo(1);_beforeClosed=new eo(1);_result;_closeFallbackTimeout;_state=f.OPEN;_closeInteractionType;constructor(e,n,i){this._ref=e,this._config=n,this._containerInstance=i,this.disableClose=n.disableClose,this.id=e.id,e.addPanelClass(`mat-mdc-dialog-panel`),i._animationStateChanged.pipe(Me(a=>a.state===`opened`),dt$1(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(Me(a=>a.state===`closed`),dt$1(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),e.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),pt$1(this.backdropClick(),this.keydownEvents().pipe(Me(a=>a.keyCode===27&&!this.disableClose&&!Si(a)))).subscribe(a=>{this.disableClose||(a.preventDefault(),dt(this,a.type===`keydown`?`keyboard`:`mouse`))})}close(e){let n=this._config.closePredicate;n&&!n(e,this._config,this.componentInstance)||(this._result=e,this._containerInstance._animationStateChanged.pipe(Me(i=>i.state===`closing`),dt$1(1)).subscribe(i=>{this._beforeClosed.next(e),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=f.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(e){let n=this._ref.config.positionStrategy;return e&&(e.left||e.right)?e.left?n.left(e.left):n.right(e.right):n.centerHorizontally(),e&&(e.top||e.bottom)?e.top?n.top(e.top):n.bottom(e.bottom):n.centerVertically(),this._ref.updatePosition(),this}updateSize(e=``,n=``){return this._ref.updateSize(e,n),this}addPanelClass(e){return this._ref.addPanelClass(e),this}removePanelClass(e){return this._ref.removePanelClass(e),this}getState(){return this._state}_finishDialogClose(){this._state=f.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function dt(t,e,n){return t._closeInteractionType=e,t.close(n)}var _t=new C(`MatMdcDialogData`);var bt=new C(`mat-mdc-dialog-default-options`);var yt=new C(`mat-mdc-dialog-scroll-strategy`,{providedIn:`root`,factory:()=>{let t=u(le);return()=>$M(t)}});var N=(()=>{class t{_defaultOptions=u(bt,{optional:!0});_scrollStrategy=u(yt);_parentDialog=u(t,{optional:!0,skipSelf:!0});_idGenerator=u(Cn);_injector=u(le);_dialog=u(he);_animationsDisabled=xn();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new R;_afterOpenedAtThisLevel=new R;dialogConfigClass=_;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let n=this._parentDialog;return n?n._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=jn(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Ct(void 0)));constructor(){this._dialogRefConstructor=c,this._dialogContainerType=ft,this._dialogDataToken=_t}open(n,i){let a;i=g(g({},this._defaultOptions||new _),i),i.id=i.id||this._idGenerator.getId(`mat-mdc-dialog-`),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let l=this._dialog.open(n,Z(g({},i),{positionStrategy:XM(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()===`0`||i.exitAnimationDuration?.toString()===`0`,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:u$1,useValue:i}]},templateContext:()=>({dialogRef:a}),providers:(s,gt,O)=>(a=new this._dialogRefConstructor(s,i,O),a.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:O},{provide:this._dialogDataToken,useValue:gt.data},{provide:this._dialogRefConstructor,useValue:a},{provide:f$1,useValue:null}])}));return a.componentRef=l.componentRef,a.componentInstance=l.componentInstance,this.openDialogs.push(a),this.afterOpened.next(a),a.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(a);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next())}),a}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(n){return this.openDialogs.find(i=>i.id===n)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(n){let i=n.length;for(;i--;)n[i].close()}static ɵfac=function(i){return new(i||t)};static ɵprov=k$1({token:t,factory:t.ɵfac})}return t})();var Vt=(()=>{class t{dialogRef=u(c,{optional:!0});_elementRef=u(ee);_dialog=u(N);ariaLabel;type=`button`;dialogResult;_matDialogClose;ngOnInit(){this.dialogRef||(this.dialogRef=mt(this._elementRef,this._dialog.openDialogs))}ngOnChanges(n){let i=n._matDialogClose;i&&(this.dialogResult=i.currentValue)}_onButtonClick(n){this._elementRef.nativeElement.getAttribute(`aria-disabled`)!==`true`&&dt(this.dialogRef,n.screenX===0&&n.screenY===0?`keyboard`:`mouse`,this.dialogResult)}static ɵfac=function(i){return new(i||t)};static ɵdir=A({type:t,selectors:[[``,`mat-dialog-close`,``],[``,`matDialogClose`,``]],hostVars:2,hostBindings:function(i,a){i&1&&Ee(`click`,function(s){return a._onButtonClick(s)}),i&2&&Oe(`aria-label`,a.ariaLabel||null)(`type`,a.type)},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],type:`type`,dialogResult:[0,`mat-dialog-close`,`dialogResult`],_matDialogClose:[0,`matDialogClose`,`_matDialogClose`]},exportAs:[`matDialogClose`],features:[Le]})}return t})();var ct=(()=>{class t{_dialogRef=u(c,{optional:!0});_elementRef=u(ee);_dialog=u(N);ngOnInit(){this._dialogRef||(this._dialogRef=mt(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static ɵfac=function(i){return new(i||t)};static ɵdir=A({type:t})}return t})();var Gt=(()=>{class t extends ct{id=u(Cn).getId(`mat-mdc-dialog-title-`);_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static ɵfac=(()=>{let n;return function(a){return(n||(n=nt(t)))(a||t)}})();static ɵdir=A({type:t,selectors:[[``,`mat-dialog-title`,``],[``,`matDialogTitle`,``]],hostAttrs:[1,`mat-mdc-dialog-title`,`mdc-dialog__title`],hostVars:1,hostBindings:function(i,a){i&2&&rr(`id`,a.id)},inputs:{id:`id`},exportAs:[`matDialogTitle`],features:[Ae]})}return t})();var Ht=(()=>{class t{static ɵfac=function(i){return new(i||t)};static ɵdir=A({type:t,selectors:[[``,`mat-dialog-content`,``],[`mat-dialog-content`],[``,`matDialogContent`,``]],hostAttrs:[1,`mat-mdc-dialog-content`,`mdc-dialog__content`],features:[IL([jH])]})}return t})();var qt=(()=>{class t extends ct{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static ɵfac=(()=>{let n;return function(a){return(n||(n=nt(t)))(a||t)}})();static ɵdir=A({type:t,selectors:[[``,`mat-dialog-actions`,``],[`mat-dialog-actions`],[``,`matDialogActions`,``]],hostAttrs:[1,`mat-mdc-dialog-actions`,`mdc-dialog__actions`],hostVars:6,hostBindings:function(i,a){i&2&&ve(`mat-mdc-dialog-actions-align-start`,a.align===`start`)(`mat-mdc-dialog-actions-align-center`,a.align===`center`)(`mat-mdc-dialog-actions-align-end`,a.align===`end`)},inputs:{align:`align`},features:[Ae]})}return t})();function mt(t,e){let n=t.nativeElement.parentElement;for(;n&&!n.classList.contains(`mat-mdc-dialog-container`);)n=n.parentElement;return n?e.find(i=>i.id===n.id):null}var Wt=(()=>{class t{static ɵfac=function(i){return new(i||t)};static ɵmod=ye({type:t});static ɵinj=me({providers:[N],imports:[Le$1,xd,PM,Dt]})}return t})();export{Wt as a,qt as c,Vt as i,Ht as n,_t as o,N as r,c as s,Gt as t};