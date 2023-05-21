import{ContainerModule as b}from"inversify";var u=Symbol.for("InputServiceName");var v=class{constructor(t,e="any"){this.keyCode=t;this.type=e}getType(){return"keyboard"}},y=class{constructor(t="Mouse-0",e="any"){this.btn=t;this.type=e}getType(){return"mouse_click"}},m=class{constructor(t="any"){this.type=t}getType(){return"mouse_wheel"}},f=class{constructor(t="x"){this.type=t}getType(){return"mouse_axis"}},h=class{constructor(t,e){this.eventXPositive=t;this.eventXNegative=e}getType(){return"compound_1d"}},g=class{constructor(t,e){this.eventX=t;this.eventY=e}getType(){return"compound_2d"}},c=class{constructor(t){this.parent=t}setupListeners(t){t.addEventListener("mousedown",e=>{this.checkMouseEvent(e,"mousedown")}),t.addEventListener("mouseup",e=>{this.checkMouseEvent(e,"mouseup")}),t.addEventListener("mouseout",e=>{this.checkMouseEvent(e,"mouseup")}),t.addEventListener("mousemove",e=>{for(let n in this.parent.inputList)for(let a of this.parent.inputList[n])if(a.getType()==="mouse_axis"){let i=a;i.type==="x"&&this.parent.notifyScalar(n,{sourceEvt:e,actionName:n,state:e.offsetX}),i.type==="y"&&this.parent.notifyScalar(n,{sourceEvt:e,actionName:n,state:e.offsetY})}}),t.addEventListener("wheel",e=>{for(let n in this.parent.inputList)for(let a of this.parent.inputList[n])if(a.getType()==="mouse_wheel"){let i=a;if(i.type==="up")throw new Error("not yet implemented");if(i.type==="down")throw new Error("not yet implemented");this.parent.notifyScalar(n,{sourceEvt:e,actionName:n,state:e.deltaY})}})}checkMouseEvent(t,e){let n="Mouse-"+t.button;for(let a in this.parent.inputList)for(let i of this.parent.inputList[a])if(i.getType()==="mouse_click"){let r=i;r.btn==n&&(e===r.type||r.type==="any")&&(this.parent.notifyBoolean(a,{sourceEvt:t,actionName:a,state:e==="mousedown"}),this.parent.notifyScalar(a,{sourceEvt:t,actionName:a,state:e==="mousedown"?1:0}))}}},l=class{constructor(t){this.parent=t}setupListeners(){window.addEventListener("keyup",t=>{this.checkKeyBoardEvent(t)}),window.addEventListener("keydown",t=>{this.checkKeyBoardEvent(t)})}checkKeyBoardEvent(t){if(t.repeat==!1){for(let e in this.parent.inputList)for(let n of this.parent.inputList[e])if(n.getType()==="keyboard"){let a=n;a.keyCode==t.code&&(t.type===a.type||a.type==="any")&&(this.parent.notifyBoolean(e,{sourceEvt:t,actionName:e,state:t.type==="keydown"}),this.parent.notifyScalar(e,{sourceEvt:t,actionName:e,state:t.type==="keydown"?1:0}))}}}},p=class{constructor(t){this.parent=t}notifyActionOn(t){for(let e in this.parent.inputList)for(let n of this.parent.inputList[e]){if(n.getType()==="compound_1d"){let a=n;if(a.eventXPositive===t||a.eventXNegative===t){let i=this.parent.getScalarEvent(a.eventXPositive),r=this.parent.getScalarEvent(a.eventXNegative);i&&r&&this.parent.notifyScalar(e,{sourceEvt:{eventXPos:i,eventXNeg:r},actionName:e,state:i.state-r.state})}}if(n.getType()==="compound_2d"){let a=n;if(a.eventX===t||a.eventY===t){let i=this.parent.getScalarEvent(a.eventX),r=this.parent.getScalarEvent(a.eventY);i&&r&&this.parent.notify2DScalar(e,{sourceEvt:{eventX:i,eventY:r},actionName:e,state:{x:i.state,y:r.state}})}}}}},o=class{inputList={};booleanCallbackList={};scalarCallbackList={};scalar2DCallbackList={};booleanState={};scalarState={};scalar2DState={};compoundManager;keyboardManager;mouseManager;constructor(){this.keyboardManager=new l(this),this.mouseManager=new c(this),this.compoundManager=new p(this)}initializeCaptureElement(t=null){t||(t=window.document.body),this.keyboardManager.setupListeners(),this.mouseManager.setupListeners(t)}notifyScalar(t,e){if(this.scalarState[t]=e,this.scalarCallbackList[t])for(let n of this.scalarCallbackList[t])n(e);this.compoundManager.notifyActionOn(t)}notify2DScalar(t,e){if(this.scalar2DState[t]=e,this.scalarCallbackList[t])for(let n of this.scalar2DCallbackList[t])n(e)}notifyBoolean(t,e){if((!this.booleanState[t]||this.booleanState[t].state!=e.state)&&(this.booleanState[t]=e,this.booleanCallbackList[t]))for(let n of this.booleanCallbackList[t])n(e)}register(t,e){this.inputList[t]||(this.inputList[t]=[]),this.inputList[t].push(e)}setBooleanValue(t,e){this.booleanState[t].state,this.notifyBoolean(t,{state:e,actionName:t,sourceEvt:null})}getBooleanValue(t){return this.booleanState[t]?this.booleanState[t].state:!1}getScalarValue(t){return this.scalarState[t]?this.scalarState[t].state:0}getScalar2DValue(t){return this.scalar2DState[t]?this.scalar2DState[t].state:{x:0,y:0}}getBooleanEvent(t){return this.booleanState[t]}getScalarEvent(t){return this.scalarState[t]}getScalar2DEvent(t){return this.scalar2DState[t]}register2DScalarEvent(t,e){return this.registerGeneric(this.scalar2DCallbackList,t,e)}registerScalarEvent(t,e){return this.registerGeneric(this.scalarCallbackList,t,e)}registerBooleanEvent(t,e){return this.registerGeneric(this.booleanCallbackList,t,e)}registerGeneric(t,e,n){return t[e]||(t[e]=[]),t[e].push(n),()=>{t[e].filter(a=>a!=n)}}};var E=class{getModule(){return new b(t=>{t(u).toDynamicValue(()=>new o).inSingletonScope()})}};export{E as AxInputModule,h as Compound1DInput,g as Compound2DInput,o as InputService,u as InputServiceName,v as KeyboardKey,f as MouseAxis,y as MouseButton,m as MouseWheel};
//# sourceMappingURL=index.js.map