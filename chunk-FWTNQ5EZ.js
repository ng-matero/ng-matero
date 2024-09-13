import{A as g,C as Z,W as U,X as K,aa as J,bb as A,ca as X,cb as ee,da as b,db as te,fb as O,gb as k,hb as ie,ib as se,jb as C,lb as D,mb as oe,w as Y}from"./chunk-V2HHRRTI.js";import{E,Fb as x,Fc as $,Kb as N,Nb as V,Oa as u,Ob as H,Sa as B,Wa as P,_c as q,a as p,fa as w,ma as j,na as L,nd as z,o as y,pa as v,ra as h,rc as Q,sa as f,sb as c,sc as G,tc as W,ub as M,v as T,wa as R,xa as S}from"./chunk-7DGUKIOD.js";function le(r,s){}var m=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="",this.height="",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.ariaModal=!0,this.autoFocus="first-tabbable",this.restoreFocus=!0,this.closeOnNavigation=!0,this.closeOnDestroy=!0,this.closeOnOverlayDetachments=!0}};var ce=(()=>{let s=class s extends te{constructor(e,t,i,o,a,n,d,F){super(),this._elementRef=e,this._focusTrapFactory=t,this._config=o,this._interactivityChecker=a,this._ngZone=n,this._overlayRef=d,this._focusMonitor=F,this._platform=f(Y),this._focusTrap=null,this._elementFocusedBeforeDialogWasOpened=null,this._closeInteractionType=null,this._ariaLabelledByQueue=[],this._changeDetectorRef=f(q),this._injector=f(u),this._isDestroyed=!1,this.attachDomPortal=ne=>{this._portalOutlet.hasAttached();let ae=this._portalOutlet.attachDomPortal(ne);return this._contentAttached(),ae},this._document=i,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{e.removeEventListener("blur",i),e.removeEventListener("mousedown",i),e.removeAttribute("tabindex")};e.addEventListener("blur",i),e.addEventListener("mousedown",i)})),e.focus(t)}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,t)}_trapFocus(){this._isDestroyed||V(()=>{let e=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||e.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let i=g(),o=this._elementRef.nativeElement;(!i||i===this._document.body||i===o||o.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let e=this._elementRef.nativeElement,t=g();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=g()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}};s.\u0275fac=function(t){return new(t||s)(c(P),c(K),c(z,8),c(m),c(U),c(B),c(C),c(J))},s.\u0275cmp=R({type:s,selectors:[["cdk-dialog-container"]],viewQuery:function(t,i){if(t&1&&Q(O,7),t&2){let o;G(o=W())&&(i._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,i){t&2&&H("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},standalone:!0,features:[x,$],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,i){t&1&&N(0,le,0,0,"ng-template",0)},dependencies:[O],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2});let r=s;return r})(),_=class{constructor(s,l){this.overlayRef=s,this.config=l,this.closed=new y,this.disableClose=l.disableClose,this.backdropClick=s.backdropClick(),this.keydownEvents=s.keydownEvents(),this.outsidePointerEvents=s.outsidePointerEvents(),this.id=l.id,this.keydownEvents.subscribe(e=>{e.keyCode===27&&!this.disableClose&&!Z(e)&&(e.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=s.detachments().subscribe(()=>{l.closeOnOverlayDetachments!==!1&&this.close()})}close(s,l){if(this.containerInstance){let e=this.closed;this.containerInstance._closeInteractionType=l?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),e.next(s),e.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(s="",l=""){return this.overlayRef.updateSize({width:s,height:l}),this}addPanelClass(s){return this.overlayRef.addPanelClass(s),this}removePanelClass(s){return this.overlayRef.removePanelClass(s),this}},he=new v("DialogScrollStrategy",{providedIn:"root",factory:()=>{let r=f(D);return()=>r.scrollStrategies.block()}}),de=new v("DialogData"),ue=new v("DefaultDialogConfig");var pe=0,fe=(()=>{let s=class s{get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}constructor(e,t,i,o,a,n){this._overlay=e,this._injector=t,this._defaultOptions=i,this._parentDialog=o,this._overlayContainer=a,this._openDialogsAtThisLevel=[],this._afterAllClosedAtThisLevel=new y,this._afterOpenedAtThisLevel=new y,this._ariaHiddenElements=new Map,this.afterAllClosed=E(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(w(void 0))),this._scrollStrategy=n}open(e,t){let i=this._defaultOptions||new m;t=p(p({},i),t),t.id=t.id||`cdk-dialog-${pe++}`,t.id&&this.getDialogById(t.id);let o=this._getOverlayConfig(t),a=this._overlay.create(o),n=new _(a,t),d=this._attachContainer(a,n,t);return n.containerInstance=d,this._attachDialogContent(e,n,d,t),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(n),n.closed.subscribe(()=>this._removeOpenDialog(n,!0)),this.afterOpened.next(n),n}closeAll(){I(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){I(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),I(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new ie({positionStrategy:e.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,i){let o=i.injector||i.viewContainerRef?.injector,a=[{provide:m,useValue:i},{provide:_,useValue:t},{provide:C,useValue:e}],n;i.container?typeof i.container=="function"?n=i.container:(n=i.container.type,a.push(...i.container.providers(i))):n=ce;let d=new A(n,i.viewContainerRef,u.create({parent:o||this._injector,providers:a}),i.componentFactoryResolver);return e.attach(d).instance}_attachDialogContent(e,t,i,o){if(e instanceof M){let a=this._createInjector(o,t,i,void 0),n={$implicit:o.data,dialogRef:t};o.templateContext&&(n=p(p({},n),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),i.attachTemplatePortal(new ee(e,null,n,a))}else{let a=this._createInjector(o,t,i,this._injector),n=i.attachComponentPortal(new A(e,o.viewContainerRef,a,o.componentFactoryResolver));t.componentRef=n,t.componentInstance=n.instance}}_createInjector(e,t,i,o){let a=e.injector||e.viewContainerRef?.injector,n=[{provide:de,useValue:e.data},{provide:_,useValue:t}];return e.providers&&(typeof e.providers=="function"?n.push(...e.providers(t,e,i)):n.push(...e.providers)),e.direction&&(!a||!a.get(b,null,{optional:!0}))&&n.push({provide:b,useValue:{value:e.direction,change:T()}}),u.create({parent:a||o,providers:n})}_removeOpenDialog(e,t){let i=this.openDialogs.indexOf(e);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,a)=>{o?a.setAttribute("aria-hidden",o):a.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let e=this._overlayContainer.getContainerElement();if(e.parentElement){let t=e.parentElement.children;for(let i=t.length-1;i>-1;i--){let o=t[i];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}};s.\u0275fac=function(t){return new(t||s)(h(D),h(u),h(ue,8),h(s,12),h(se),h(he))},s.\u0275prov=j({token:s,factory:s.\u0275fac,providedIn:"root"});let r=s;return r})();function I(r,s){let l=r.length;for(;l--;)s(r[l])}var Me=(()=>{let s=class s{};s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=S({type:s}),s.\u0275inj=L({providers:[fe],imports:[oe,k,X,k]});let r=s;return r})();export{m as a,ce as b,fe as c,Me as d};
