import{C as W,H as z,Q as Y,R as q,U as Z,V as U,W as $,ca as y,eb as g,fb as K,gb as J,ib as v,jb as C,kb as X,lb as ee,mb as D,ob as b,pb as te,z as m}from"./chunk-KE6KFSVW.js";import{Ab as S,C as k,Ha as h,Ib as P,Jb as B,Mb as M,Na as E,Ob as j,Ta as I,Ub as x,_c as V,a as d,da as T,eb as R,ka as w,la as F,m as f,md as Q,na as _,qa as r,t as O,wb as L,wc as H,xc as N,yc as G}from"./chunk-B3XC7Y5W.js";function ie(s,l){}var c=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=!0;backdropClass="";disableClose=!1;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus="first-tabbable";restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;componentFactoryResolver;providers;container;templateContext};var oe=(()=>{class s extends J{_elementRef=r(I);_focusTrapFactory=r(q);_config;_interactivityChecker=r(Y);_ngZone=r(E);_overlayRef=r(D);_focusMonitor=r(z);_renderer=r(S);_platform=r(W);_document=r(Q,{optional:!0});_portalOutlet;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_changeDetectorRef=r(V);_injector=r(h);_isDestroyed=!1;constructor(){super(),this._config=r(c,{optional:!0})||new c,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._handleBackdropClicks(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let i=()=>{o(),n(),e.removeAttribute("tabindex")},o=this._renderer.listen(e,"blur",i),n=this._renderer.listen(e,"mousedown",i)})),e.focus(t)}_focusByCssSelector(e,t){let i=this._elementRef.nativeElement.querySelector(e);i&&this._forceFocus(i,t)}_trapFocus(){this._isDestroyed||R(()=>{let e=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case"dialog":this._containsFocus()||e.focus();break;case!0:case"first-tabbable":this._focusTrap?.focusInitialElement()||this._focusDialogContainer();break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e=="string"?t=this._document.querySelector(e):typeof e=="boolean"?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus=="function"){let i=m(),o=this._elementRef.nativeElement;(!i||i===this._document.body||i===o||o.contains(i))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(){this._elementRef.nativeElement.focus&&this._elementRef.nativeElement.focus()}_containsFocus(){let e=this._elementRef.nativeElement,t=m();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=m()))}_handleBackdropClicks(){this._overlayRef.backdropClick().subscribe(()=>{this._config.disableClose&&this._recaptureFocus()})}static \u0275fac=function(t){return new(t||s)};static \u0275cmp=P({type:s,selectors:[["cdk-dialog-container"]],viewQuery:function(t,i){if(t&1&&H(v,7),t&2){let o;N(o=G())&&(i._portalOutlet=o.first)}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(t,i){t&2&&x("id",i._config.id||null)("role",i._config.role)("aria-modal",i._config.ariaModal)("aria-labelledby",i._config.ariaLabel?null:i._ariaLabelledByQueue[0])("aria-label",i._config.ariaLabel)("aria-describedby",i._config.ariaDescribedBy||null)},features:[M],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,i){t&1&&j(0,ie,0,0,"ng-template",0)},dependencies:[v],styles:[".cdk-dialog-container{display:block;width:100%;height:100%;min-height:inherit;max-height:inherit}"],encapsulation:2})}return s})(),u=class{overlayRef;config;componentInstance;componentRef;containerInstance;disableClose;closed=new f;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(l,e){this.overlayRef=l,this.config=e,this.disableClose=e.disableClose,this.backdropClick=l.backdropClick(),this.keydownEvents=l.keydownEvents(),this.outsidePointerEvents=l.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!$(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}))}),this.backdropClick.subscribe(()=>{this.disableClose||this.close(void 0,{focusOrigin:"mouse"})}),this._detachSubscription=l.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(l,e){if(this.containerInstance){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(l),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(l="",e=""){return this.overlayRef.updateSize({width:l,height:e}),this}addPanelClass(l){return this.overlayRef.addPanelClass(l),this}removePanelClass(l){return this.overlayRef.removePanelClass(l),this}},ae=new _("DialogScrollStrategy",{providedIn:"root",factory:()=>{let s=r(b);return()=>s.scrollStrategies.block()}}),se=new _("DialogData"),re=new _("DefaultDialogConfig");var ne=(()=>{class s{_overlay=r(b);_injector=r(h);_defaultOptions=r(re,{optional:!0});_parentDialog=r(s,{optional:!0,skipSelf:!0});_overlayContainer=r(ee);_idGenerator=r(U);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new f;_afterOpenedAtThisLevel=new f;_ariaHiddenElements=new Map;_scrollStrategy=r(ae);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=k(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(T(void 0)));constructor(){}open(e,t){let i=this._defaultOptions||new c;t=d(d({},i),t),t.id=t.id||this._idGenerator.getId("cdk-dialog-"),t.id&&this.getDialogById(t.id);let o=this._getOverlayConfig(t),n=this._overlay.create(o),a=new u(n,t),p=this._attachContainer(n,a,t);return a.containerInstance=p,this._attachDialogContent(e,a,p,t),this.openDialogs.length||this._hideNonDialogContentFromAssistiveTechnology(),this.openDialogs.push(a),a.closed.subscribe(()=>this._removeOpenDialog(a,!0)),this.afterOpened.next(a),a}closeAll(){A(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){A(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),A(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new X({positionStrategy:e.positionStrategy||this._overlay.position().global().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,i){let o=i.injector||i.viewContainerRef?.injector,n=[{provide:c,useValue:i},{provide:u,useValue:t},{provide:D,useValue:e}],a;i.container?typeof i.container=="function"?a=i.container:(a=i.container.type,n.push(...i.container.providers(i))):a=oe;let p=new g(a,i.viewContainerRef,h.create({parent:o||this._injector,providers:n}));return e.attach(p).instance}_attachDialogContent(e,t,i,o){if(e instanceof L){let n=this._createInjector(o,t,i,void 0),a={$implicit:o.data,dialogRef:t};o.templateContext&&(a=d(d({},a),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),i.attachTemplatePortal(new K(e,null,a,n))}else{let n=this._createInjector(o,t,i,this._injector),a=i.attachComponentPortal(new g(e,o.viewContainerRef,n));t.componentRef=a,t.componentInstance=a.instance}}_createInjector(e,t,i,o){let n=e.injector||e.viewContainerRef?.injector,a=[{provide:se,useValue:e.data},{provide:u,useValue:t}];return e.providers&&(typeof e.providers=="function"?a.push(...e.providers(t,e,i)):a.push(...e.providers)),e.direction&&(!n||!n.get(y,null,{optional:!0}))&&a.push({provide:y,useValue:{value:e.direction,change:O()}}),h.create({parent:n||o,providers:a})}_removeOpenDialog(e,t){let i=this.openDialogs.indexOf(e);i>-1&&(this.openDialogs.splice(i,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,n)=>{o?n.setAttribute("aria-hidden",o):n.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(){let e=this._overlayContainer.getContainerElement();if(e.parentElement){let t=e.parentElement.children;for(let i=t.length-1;i>-1;i--){let o=t[i];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(t){return new(t||s)};static \u0275prov=w({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();function A(s,l){let e=s.length;for(;e--;)l(s[e])}var Ie=(()=>{class s{static \u0275fac=function(t){return new(t||s)};static \u0275mod=B({type:s});static \u0275inj=F({providers:[ne],imports:[te,C,Z,C]})}return s})();export{c as a,oe as b,ne as c,Ie as d};
