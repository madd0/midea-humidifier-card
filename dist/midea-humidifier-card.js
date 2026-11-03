function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;var e="M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z",i="M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M17 15V17H18V23H20V15H17Z",s="M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M21 21V20.5C21 19.67 20.33 19 19.5 19C20.33 19 21 18.33 21 17.5V17C21 15.89 20.1 15 19 15H16V17H19V18H17V20H19V21H16V23H19C20.11 23 21 22.11 21 21";var n={version:"Version",invalid_configuration:"Invalid configuration",tank_is_full:"Caution : Water tank is full, please empty it",change_airfilter:"Caution : Please change the air filter",defrosting:"Caution : Please wait, currently defrosting...",tank:"Tank",filter:"Filter",defrost:"Defrost",humidity_down:"Decrease humidity",humidity_up:"Increase humidity"},r={common:n},o={version:"Version",invalid_configuration:"Configuration invalide",tank_is_full:"Attention : Le réservoir est plein",change_airfilter:"Attention : Changer le filtre à air",defrosting:"Attention : Dégivrage en cours...",tank:"Réservoir",filter:"Filtre",defrost:"Dégivrage",humidity_down:"Diminuer l'humidité",humidity_up:"Augmenter l'humidité"},a={common:o};const l={en:Object.freeze({__proto__:null,common:n,default:r}),fr:Object.freeze({__proto__:null,common:o,default:a})};function d(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let n;try{n=t.split(".").reduce(((t,e)=>t[e]),l[s])}catch(e){n=t.split(".").reduce(((t,e)=>t[e]),l.en)}return void 0===n&&(n=t.split(".").reduce(((t,e)=>t[e]),l.en)),""!==e&&""!==i&&(n=n.replace(e,i)),n}const h=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,c=Symbol(),u=new Map;class p{constructor(t,e){if(this._$cssResult$=!0,e!==c)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=u.get(this.cssText);return h&&void 0===t&&(u.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const _=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new p(i,c)},v=h?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new p("string"==typeof t?t:t+"",c))(e)})(t):t;var m,f;const g={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>e!==t&&(e==e||t==t),$={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:y};class b extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(v(t))}else void 0!==t&&e.push(v(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{h?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=$){var s,n;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const o=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:g.toAttribute)(e,i.type);this._$Ei=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Ei=null}}_$AK(t,e){var i,s,n;const r=this.constructor,o=r._$Eu.get(t);if(void 0!==o&&this._$Ei!==o){const t=r.getPropertyOptions(o),a=t.converter,l=null!==(n=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==n?n:g.fromAttribute;this._$Ei=o,this[o]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||y)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}var w,C;b.finalized=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null===(m=globalThis.reactiveElementPolyfillSupport)||void 0===m||m.call(globalThis,{ReactiveElement:b}),(null!==(f=globalThis.reactiveElementVersions)&&void 0!==f?f:globalThis.reactiveElementVersions=[]).push("1.0.0");const A=globalThis.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S=`lit$${(Math.random()+"").slice(9)}$`,k="?"+S,H=`<${k}>`,E=document,M=(t="")=>E.createComment(t),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,P=/>/g,I=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,N=/'/g,U=/"/g,O=/^(?:script|style|textarea)$/i,D=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),j=D(1),R=D(2),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),q=new WeakMap,Z=E.createTreeWalker(E,129,null,!1),W=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===T?"!--"===l[1]?o=z:void 0!==l[1]?o=P:void 0!==l[2]?(O.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=null!=n?n:T,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?I:'"'===l[3]?U:N):o===U||o===N?o=I:o===z||o===P?o=T:(o=I,n=void 0);const c=o===I&&t[e+1].startsWith("/>")?" ":"";r+=o===T?i+H:d>=0?(s.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+S+c):i+S+(-2===d?(s.push(void 0),e):c)}const a=r+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==x?x.createHTML(a):a,s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,d]=W(t,e);if(this.el=J.createElement(l,i),Z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=Z.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(S)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(S),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?tt:"@"===e[1]?et:Y})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),Z.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){var n,r,o,a;if(e===B)return e;let l=void 0!==s?null===(n=i._$Cl)||void 0===n?void 0:n[s]:i._$Cu;const d=V(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Cl)&&void 0!==o?o:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=K(t,l._$AS(t,e.values),l,s)),e}class G{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);Z.currentNode=n;let r=Z.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new X(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new it(r,this,t)),this.v.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(r=Z.nextNode(),o++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{constructor(t,e,i,s){var n;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),V(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return L(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==F&&V(this._$AH)?this._$AA.nextSibling.data=t:this.S(E.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new G(n,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new J(t)),e}M(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.A(M()),this.A(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Y{constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=K(this,t,e,0),r=!V(t)||t!==this._$AH&&t!==B,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=K(this,s[i+o],e,o),a===B&&(a=this._$AH[o]),r||(r=!V(a)||a!==this._$AH[o]),a===F?t=F:t!==F&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.k(t)}k(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends Y{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===F?void 0:t}}class tt extends Y{constructor(){super(...arguments),this.type=4}k(t){t&&t!==F?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class et extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:F)===B)return;const s=this._$AH,n=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==F&&(s===F||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}var st,nt,rt;null===(w=globalThis.litHtmlPolyfillSupport)||void 0===w||w.call(globalThis,J,X),(null!==(C=globalThis.litHtmlVersions)&&void 0!==C?C:globalThis.litHtmlVersions=[]).push("2.0.0");class ot extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new X(e.insertBefore(M(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return B}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot}),null===(nt=globalThis.litElementPolyfillSupport)||void 0===nt||nt.call(globalThis,{LitElement:ot}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.0.0");const at=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),lt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function dt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):lt(t,e)}function ht(t){return dt({...t,state:!0})}const ct=1;const ut=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==ct||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.et)||void 0===i?void 0:i.has(t))&&this.st.add(t);return this.render(e)}const n=t.element.classList;this.st.forEach((t=>{t in e||(n.remove(t),this.st.delete(t))}));for(const t in e){const i=!!e[t];i===this.st.has(t)||(null===(s=this.et)||void 0===s?void 0:s.has(t))||(i?(n.add(t),this.st.add(t)):(n.remove(t),this.st.delete(t)))}return B}});var pt="[^\\s]+";function _t(t,e){for(var i=[],s=0,n=t.length;s<n;s++)i.push(t[s].substr(0,e));return i}var vt=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})),n=s.indexOf(e.toLowerCase());return n>-1?n:null}};function mt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,n=e;s<n.length;s++){var r=n[s];for(var o in r)t[o]=r[o]}return t}var ft=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],gt=["January","February","March","April","May","June","July","August","September","October","November","December"],yt=_t(gt,3),$t={dayNamesShort:_t(ft,3),dayNames:ft,monthNamesShort:yt,monthNames:gt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},bt=(mt({},$t),function(t){return+t-1}),wt=[null,"[1-9]\\d?"],Ct=[null,pt],At=["isPm",pt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],xt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];vt("monthNamesShort"),vt("monthNames");function St(){return(St=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var kt,Ht;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(kt||(kt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Ht||(Ht={}));var Et=function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};const Mt={low:0,silent:0,medium:1,turbo:2,high:2},Vt={off:0,set:1,smart:2,continuous:3,dry:4},Lt=(t,e)=>Vt[t]-Vt[e],Tt=(t,e)=>Mt[t]-Mt[e],zt="M 57.47 262.53 A 145 145 0 1 1 262.53 262.53";let Pt=class extends ot{constructor(){super(...arguments),this.min=0,this.max=100,this.step=5,this.value=0,this.disabled=!1,this.label="",this.mode="start",this.decreaseLabel="Decrease humidity",this.increaseLabel="Increase humidity"}get _interactive(){return!this.disabled&&this.max>this.min&&this.step>0}_bound(t){return Math.min(this.max,Math.max(this.min,t))}_snap(t){const e=this.min+Math.round((t-this.min)/this.step)*this.step;return this._bound(Number(e.toFixed(6)))}_emit(t,e){this.dispatchEvent(new CustomEvent(t,{detail:{value:e},bubbles:!0,composed:!0}))}_valueFromPointer(t){const e=t.currentTarget.getBoundingClientRect(),i=(t.clientX-e.left)/e.width-.5,s=(t.clientY-e.top)/e.height-.5;let n=(180*Math.atan2(s,i)/Math.PI-135+360)%360;return n>270&&(n=n<315?270:0),this._snap(this.min+n/270*(this.max-this.min))}_preview(t){const e=this._valueFromPointer(t);e!==this._dragValue&&(this._dragValue=e,this._emit("value-changing",e))}_pointerDown(t){if(!this._interactive||void 0!==this._pointerId||0!==t.button)return;t.preventDefault();const e=t.currentTarget;e.focus(),e.setPointerCapture(t.pointerId),this._pointerId=t.pointerId,this._preview(t)}_pointerMove(t){this._interactive&&t.pointerId===this._pointerId&&this._preview(t)}_pointerUp(t){if(t.pointerId!==this._pointerId)return;const e=t.currentTarget;this._pointerId=void 0,e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._interactive?this._commit(this._valueFromPointer(t)):this._cancelDrag()}_cancelDrag(){void 0!==this._dragValue&&(this._dragValue=void 0,this._emit("value-changing",this.value)),this._pointerId=void 0}_pointerCancel(t){t.pointerId===this._pointerId&&this._cancelDrag()}_commit(t){this.value=t,this._dragValue=void 0,this._emit("value-changed",t)}_adjust(t){if(!this._interactive||void 0!==this._pointerId)return;const e=this._snap(this.value+t);e!==this.value&&this._commit(e)}_decrease(){this._adjust(-this.step)}_increase(){this._adjust(this.step)}_keyDown(t){if(!this._interactive||void 0!==this._pointerId)return;let e=this.value;switch(t.key){case"ArrowUp":case"ArrowRight":e=this._snap(e+this.step);break;case"ArrowDown":case"ArrowLeft":e=this._snap(e-this.step);break;case"PageUp":e=this._snap(e+Math.max(this.step,(this.max-this.min)/10));break;case"PageDown":e=this._snap(e-Math.max(this.step,(this.max-this.min)/10));break;case"Home":e=this.min;break;case"End":e=this.max;break;default:return}t.preventDefault(),e!==this.value&&this._commit(e)}willUpdate(t){(t.has("disabled")||t.has("min")||t.has("max")||t.has("step")||t.has("value"))&&this._cancelDrag()}disconnectedCallback(){this._cancelDrag(),super.disconnectedCallback()}render(){var t;const e=this._bound(null!==(t=this._dragValue)&&void 0!==t?t:this.value),i=this._fraction(e),s=(135+270*i)*Math.PI/180,n=160+145*Math.cos(s),r=160+145*Math.sin(s),o=null!=this.current&&Number.isFinite(this.current)?this.current:void 0,a=this._fraction(null!=o?o:"end"===this.mode?this.max:this.min),l="end"===this.mode?i:0,d="end"===this.mode?1:i,h="end"===this.mode?i:a,c="end"===this.mode?a:i,u=void 0!==o&&o>=this.min&&o<=this.max,p=(135+270*a)*Math.PI/180;return j`
      <svg viewBox="0 0 320 320" role="slider"
        tabindex=${this._interactive?"0":"-1"}
        aria-label=${this.label}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${e}
        aria-valuetext=${`${e}%`}
        aria-disabled=${!this._interactive}
        @keydown=${this._keyDown}
        @pointerdown=${this._pointerDown}
        @pointermove=${this._pointerMove}
        @pointerup=${this._pointerUp}
        @pointercancel=${this._pointerCancel}
        @lostpointercapture=${this._pointerCancel}>
        <path class="track" d=${zt} />
        ${this._segment("arc-base",l,d)}
        ${this._segment("tinted",l,d)}
        ${this._segment("active",h,c)}
        ${u?R`
          <circle class=${a>=l&&a<=d&&!this.disabled?"current on-color":"current"}
            cx=${160+145*Math.cos(p)}
            cy=${160+145*Math.sin(p)} r="4" />
        `:F}
        <path class="hit-area" d=${zt} />
        <circle class="thumb" cx=${n} cy=${r} r="10.5" />
      </svg>
      <div class="buttons">
        <button type="button" class="decrease" aria-label=${this.decreaseLabel}
          title=${this.decreaseLabel}
          ?disabled=${!this._interactive||e<=this.min}
          @click=${this._decrease}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 11h14v2H5z" /></svg>
        </button>
        <button type="button" class="increase" aria-label=${this.increaseLabel}
          title=${this.increaseLabel}
          ?disabled=${!this._interactive||e>=this.max}
          @click=${this._increase}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" /></svg>
        </button>
      </div>
    `}_fraction(t){return this.max>this.min?(this._bound(t)-this.min)/(this.max-this.min):0}_segment(t,e,i){const s=100*Math.max(0,i-e);return R`<path class=${t} d=${zt} pathLength="100"
      stroke-dasharray=${`${s} 100`}
      stroke-dashoffset=${0===e?0:100*-e}
      visibility=${0===s||this.disabled?"hidden":"visible"} />`}};Pt.styles=_`
    :host {
      display: block;
      width: 100%;
      position: relative;
      container-type: inline-size;
      --midea-slider-color: var(--primary-color, #03a9f4);
      --midea-slider-track-color: var(--disabled-color, #bdbdbd);
    }
    :host > svg {
      display: block;
      width: 100%;
      overflow: visible;
      outline: none;
      pointer-events: none;
      touch-action: none;
    }
    :host > svg path {
      fill: none;
      stroke-width: 24;
      stroke-linecap: round;
    }
    .track {
      stroke: var(--midea-slider-track-color);
      opacity: 0.3;
    }
    .tinted {
      stroke: var(--midea-slider-color);
      opacity: 0.5;
    }
    .arc-base {
      stroke: var(--clear-background-color, var(--card-background-color, white));
    }
    .active {
      stroke: var(--midea-slider-color);
    }
    :host > svg .hit-area {
      stroke: transparent;
      stroke-width: 48;
    }
    .hit-area, .thumb {
      pointer-events: auto;
      touch-action: none;
      cursor: pointer;
    }
    .thumb {
      fill: white;
      stroke: var(--midea-slider-color);
      stroke-width: 3;
    }
    .current {
      fill: var(--primary-text-color, #212121);
      opacity: 0.5;
    }
    .current.on-color {
      fill: var(--clear-background-color, white);
    }
    svg:focus-visible .thumb {
      stroke: var(--primary-text-color, #212121);
      stroke-width: 4;
    }
    :host([disabled]) .hit-area, :host([disabled]) .thumb {
      cursor: default;
    }
    .buttons {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 24px;
      direction: ltr;
      pointer-events: none;
    }
    button {
      width: 48px;
      height: 48px;
      padding: 11px;
      box-sizing: border-box;
      border: 1px solid currentColor;
      border-radius: 50%;
      color: var(--secondary-text-color, #727272);
      background: transparent;
      cursor: pointer;
      pointer-events: auto;
      display: grid;
      place-items: center;
      -webkit-tap-highlight-color: transparent;
    }
    button svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    button:enabled:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    button:enabled:active {
      background: var(--divider-color, rgba(127, 127, 127, 0.24));
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 3px;
    }
    button:disabled {
      color: var(--disabled-text-color, #9e9e9e);
      opacity: 0.5;
      cursor: default;
    }
    @container (max-width: 249px) {
      .buttons {
        position: static;
        margin-top: 8px;
        padding-bottom: 10px;
      }
    }
  `,t([dt({type:Number})],Pt.prototype,"min",void 0),t([dt({type:Number})],Pt.prototype,"max",void 0),t([dt({type:Number})],Pt.prototype,"step",void 0),t([dt({type:Number})],Pt.prototype,"value",void 0),t([dt({type:Boolean,reflect:!0})],Pt.prototype,"disabled",void 0),t([dt()],Pt.prototype,"label",void 0),t([dt({type:Number})],Pt.prototype,"current",void 0),t([dt()],Pt.prototype,"mode",void 0),t([dt()],Pt.prototype,"decreaseLabel",void 0),t([dt()],Pt.prototype,"increaseLabel",void 0),t([ht()],Pt.prototype,"_dragValue",void 0),Pt=t([at("midea-humidity-slider")],Pt);console.info("%c midea-humidifier-card %c 1.0.7","color: cyan; background: black; font-weight: bold;","color: darkblue; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"midea-humidifier-card",name:"Midea (De)humidifier Card",description:"Midea/Inventor (De)humidifier lovelace UI card"});const It=(t,e,i,s,n,r)=>{const o=[];(null==n?void 0:n.length)&&o.push((t=>n.includes(function(t){return t.substr(0,t.indexOf("."))}(t)))),r&&o.push((e=>t.states[e]&&r(t.states[e])));const a=((t,e,i)=>{(!i||i>t.length)&&(i=t.length);const s=[];for(let n=0;n<t.length&&s.length<i;n++){let i=!0;for(const s of e)if(!s(t[n])){i=!1;break}i&&s.push(t[n])}return s})(i,o,e);if(a.length<e&&s.length){const i=It(t,e-a.length,s,[],n,r);a.push(...i)}return a},Nt=t=>void 0===t.attributes.friendly_name?Ut(t.entity_id).replace(/_/g," "):t.attributes.friendly_name||"",Ut=t=>t.substr(t.indexOf(".")+1),Ot=/^(\w+)\.(\w+)$/,Dt=t=>Ot.test(t),jt=(t,e=!0)=>{if(!t||!Array.isArray(t))throw new Error("Entities need to be an array");return t.map(((t,i)=>{if("object"==typeof t&&!Array.isArray(t)&&t.type)return t;let s;if("string"==typeof t)s={entity:t};else{if("object"!=typeof t||Array.isArray(t))throw new Error(`Invalid entity specified at position ${i}.`);if(!("entity"in t))throw new Error(`Entity object at position ${i} is missing entity field.`);s=t}if(e&&!Dt(s.entity))throw new Error(`Invalid entity ID at position ${i}: ${s.entity}`);return s}))};const Rt=["unavailable","unknown"],Bt={off:e,set:"M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5",continuous:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",smart:"M13 3C16.9 3 20 6.1 20 10C20 12.8 18.4 15.2 16 16.3V21H9V18H8C6.9 18 6 17.1 6 16V13H4.5C4.1 13 3.8 12.5 4.1 12.2L6 9.7C6.2 5.9 9.2 3 13 3M13 1C8.4 1 4.6 4.4 4.1 8.9L2.5 11C1.9 11.8 1.9 12.8 2.3 13.6C2.7 14.3 3.3 14.8 4 14.9V16C4 17.9 5.3 19.4 7 19.9V23H18V17.5C20.5 15.8 22 13.1 22 10C22 5 18 1 13 1M14 14H12V13H14V14M15.6 9.5C15.3 9.9 15 10.3 14.5 10.6V12H11.5V10.6C10.1 9.8 9.6 7.9 10.4 6.5S13.1 4.6 14.5 5.4 16.4 8.1 15.6 9.5Z",dry:"M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21"},Ft={off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",on:"M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M13,17H11V7H13V17Z"},qt={silent:i,low:i,medium:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M16 15V17H19V18H18C16.9 18 16 18.9 16 20V23H21V21H18V20H19C20.11 20 21 19.11 21 18V17C21 15.9 20.11 15 19 15H16Z",turbo:s,high:s};let Zt=class extends ot{static async getConfigElement(){return await Promise.resolve().then((function(){return Jt})),document.createElement("midea-humidifier-card-editor")}static getStubConfig(t,e,i){const s=It(t,1,e,i,["humidifier"])||[];if(!s||!s[0].includes("."))return{type:"'custom:midea-humidifier-card'",entity:"",fan_entity:"",tank_entity:"",defrost_entity:"",filter_entity:"",humidity_entity:"",temperature_entity:"",ion_entity:"",swap_target_and_current_humidity:!0,show_ion_toggle:!0};const n=s[0].split(".")[1];return{type:"custom:midea-humidifier-card",entity:`humidifier.${n}`,fan_entity:`fan.${n}_fan`,tank_entity:`binary_sensor.${n}_tank_full`,defrost_entity:`binary_sensor.${n}_defrosting`,filter_entity:`binary_sensor.${n}_replace_filter`,humidity_entity:`sensor.${n}_humidity`,temperature_entity:`sensor.${n}_temperature`,ion_entity:`switch.${n}_ion_mode`,swap_target_and_current_humidity:!0,show_ion_toggle:!0}}getCardSize(){return 6}setConfig(t){if(!t.entity||"humidifier"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the humidifier domain");if(!t.fan_entity||"fan"!==t.fan_entity.split(".")[0])throw new Error("Specify a fan_entity from within the fan domain");if(!t.humidity_entity||!t.temperature_entity)throw new Error("Humidity and temperature sensors entity are required for this card to function properly");this._config=this.autoWatchEntities(t)}autoWatchEntities(t){const{entities:e=[]}=t;Object.keys(t).map((i=>{i.includes("entity")&&(e.includes(t[i])||e.push(t[i]))}));return Object.assign(Object.assign({},t),{entities:e})}_lower(t){return null==t?void 0:t.toLowerCase()}_renderPowerIcon(t,e){if(!Ft[this._lower(t)])return j``;return j`
      <button type="button"
        class=${ut({"selected-icon":!(t!==e)})}
        .status=${t}
        @click=${this._handlePowerAction}
        tabindex="0"
        aria-label=${this._lower(t)}
        title=${this._lower(t)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${Ft[this._lower(t)]} /></svg>
      </button>
    `}_renderFanIcon(t,e,i){const s=!(e!==t);return qt[this._lower(t)]?j`
      <button type="button"
        class=${ut({"selected-icon":s&&!i})}
        .mode=${t}
        @click=${this._handleFanAction}
        tabindex="0"
        aria-label=${this._lower(t)}
        aria-pressed=${s&&!i}
        title=${t}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${qt[this._lower(t)]} /></svg>
      </button>
    `:j``}_renderIcon(t,e,i){const s=!(this._lower(e)!==this._lower(t));return Bt[this._lower(t)]?j`
      <button type="button"
        class=${ut({"selected-icon":s&&!i})}
        .mode=${t}
        @click=${this._handleAction}
        tabindex="0"
        aria-label=${this._lower(t)}
        aria-pressed=${s&&!i}
        title=${t}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${Bt[this._lower(t)]} /></svg>
      </button>
    `:j``}_handlePowerAction(t){const e="on"===t.currentTarget.status?"turn_on":"turn_off";this.hass.callService("humidifier",e,{entity_id:this._config.entity})}_handleFanAction(t){this.hass.callService("fan","set_preset_mode",{entity_id:this._config.fan_entity,preset_mode:t.currentTarget.mode})}_handleToggleIonModeAction(){this.hass.callService("switch","toggle",{entity_id:this._config.ion_entity})}_handleAction(t){this.hass.callService("humidifier","set_mode",{entity_id:this._config.entity,mode:t.currentTarget.mode})}_getWarningText(t){return j`<div>
      ${t.tank?j`<hui-warning>${d("common.tank_is_full")}</hui-warning>`:j``}
      ${t.defrost?j`<hui-warning>${d("common.defrosting")}</hui-warning>`:j``}
      ${t.filter?j`<hui-warning>${d("common.change_airfilter")}</hui-warning>`:j``}
    </div>`}_get(t,e){return e.reduce(((t,e)=>t&&"undefined"!==t[e]?t[e]:void 0),t)}_readHassState(t){const e=this._get(this,["_config",t]);if(e){return this._get(this,["hass","states",e])}}render(){var t,i,s,n,r,o,a,l,h,c,u,p,_,v;if(!this.hass||!this._config)return j``;const m=this._readHassState("entity"),f=this._readHassState("fan_entity"),g=this._readHassState("tank_entity"),y=this._readHassState("filter_entity"),$=this._readHassState("defrost_entity"),b=this._readHassState("ion_entity"),w=this._lower(null===(t=null==m?void 0:m.attributes)||void 0===t?void 0:t.mode)in Bt?null===(i=null==m?void 0:m.attributes)||void 0===i?void 0:i.mode:"unknown-mode",C=this._lower(null===(s=null==f?void 0:f.attributes)||void 0===s?void 0:s.preset_mode)in qt?null===(n=null==f?void 0:f.attributes)||void 0===n?void 0:n.preset_mode:"unknown-fan-mode",A=this.hass.states[this._config.humidity_entity].state,x=m.state,S=!("off"!==x),k=this.hass.states[this._config.temperature_entity].state,H=parseFloat(k),E=null!==(o=null===(r=this.hass.states[this._config.temperature_entity].attributes)||void 0===r?void 0:r.unit_of_measurement)&&void 0!==o?o:"°C";if(!m)return j`
        <hui-warning>
          ${M=this.hass,V=this._config.entity,"NOT_RUNNING"!==M.config.state?M.localize("ui.panel.lovelace.warning.entity_not_found","entity",V||"[empty]"):M.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `;var M,V;const L=!0===this._config.swap_target_and_current_humidity,T=this._config.name||Nt(this.hass.states[this._config.entity]),z=null!=m.attributes.humidity&&Number.isFinite(m.attributes.humidity)?m.attributes.humidity:null!==(a=m.attributes.min_humidity)&&void 0!==a?a:0,P=Rt.includes(m.state)||S,I=null!==(l=this._previewHumidity)&&void 0!==l?l:this._targetHumidity,N=j`
          <midea-humidity-slider
            .value=${null!==(h=this._targetHumidity)&&void 0!==h?h:z}
            .min=${null!==(c=m.attributes.min_humidity)&&void 0!==c?c:0}
            .max=${null!==(u=m.attributes.max_humidity)&&void 0!==u?u:100}
            .step=${5}
            .disabled=${P}
            .mode=${"dehumidifier"===m.attributes.device_class?"end":"start"}
            .current=${this._currentHumidity}
            .label=${T}
            .decreaseLabel=${this.hass.localize("ui.components.climate-control.humidity_down")||d("common.humidity_down")}
            .increaseLabel=${this.hass.localize("ui.components.climate-control.humidity_up")||d("common.humidity_up")}
            @value-changing=${this._dragEvent}
            @value-changed=${this._setTargetHumidity}>
          </midea-humidity-slider>
        `,U=L?this._currentHumidity:I,O=L?I:this._currentHumidity,D={tank:"on"===(null==g?void 0:g.state),defrost:"on"===(null==$?void 0:$.state),filter:"on"===(null==y?void 0:y.state)},R="on"===(null==g?void 0:g.state)||"on"===(null==$?void 0:$.state)||"on"===(null==y?void 0:y.state)||!1;return j`
      <ha-card
        class=${ut({[R?"error":S?"off":this._lower(w)]:!0})}
      >
        <ha-icon-button
          class="more-info"
          .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
          .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
          @click=${this._handleMoreInfo}
          tabindex="0"
        ></ha-icon-button>
        <div class="content">
          <div id="controls">
            <div id="slider">
              ${N}
              <div id="slider-center">
                <div id="humidity">
                  <div class="state-label">
                    ${this.hass.localize(`state.default.${m.state}`)||m.state}
                    ${m.attributes.mode&&!Rt.includes(m.state)?j` - ${this.hass.localize(`state_attributes.humidifier.mode.${m.attributes.mode}`)||m.attributes.mode}`:""}
                  </div>
                  <div class="primary-humidity">
                    ${null!==(p=null==U?void 0:U.toFixed())&&void 0!==p?p:"--"}<span>%</span>
                  </div>
                  <div class="secondary-values">
                    ${Rt.includes(A)||void 0===O?"":j`${O.toFixed()}%`}
                    ${Number.isFinite(H)?j` · ${H}${E}`:""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="info" .title=${T}>
            <div class="modes">
              ${(m.attributes.available_modes||[]).concat().sort(Lt).map((t=>this._renderIcon(t,w,S)))}
              ${(null==D?void 0:D.defrost)?j`<span
                  class=${ut({"defrost-icon":D.defrost&&!S})}
                  role="img" aria-label=${d("common.defrost")} title=${d("common.defrost")}
                  ><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${"M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z"} /></svg></span>`:j``}
            </div>
            <div class="modes">
              ${!0===(null===(_=this._config)||void 0===_?void 0:_.show_ion_toggle)?j`<button type="button"
                  class=${ut({"ion-icon":"on"===b.state&&!S})}
                  tabindex="0"  
                  @click=${this._handleToggleIonModeAction}                
                  aria-label="Ion" title="Ion"
                  aria-pressed=${"on"===b.state&&!S}
                  ><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${"on"===b.state?"M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z":e} /></svg></button>`:j``}
              ${((null===(v=null==f?void 0:f.attributes)||void 0===v?void 0:v.preset_modes)||[]).concat().sort(Tt).map((t=>this._renderFanIcon(t,C,S)))}
              ${this._renderPowerIcon("off"===x?"on":"off",x)}             
            </div>          
            ${T}
          </div>
        </div>
        <div id="warnings">
          ${R?this._getWarningText(D):j``}
        </div> 
      </ha-card>
    `}shouldUpdate(t){return t.has("_targetHumidity")||t.has("_previewHumidity")||t.has("_currentHumidity")||function(t,e){if(function(t,e){if(e.has("_config"))return!0;const i=e.get("hass");return!i||i.connected!==t.hass.connected||i.themes!==t.hass.themes||i.locale!==t.hass.locale||i.localize!==t.hass.localize||i.config.state!==t.hass.config.state}(t,e))return!0;const i=e.get("hass");return jt(t._config.entities,!1).some((e=>"entity"in e&&i.states[e.entity]!==t.hass.states[e.entity]))}(this,t)}updated(t){if(super.updated(t),!this._config||!this.hass||!t.has("hass")&&!t.has("_config"))return;const e=t.get("hass"),i=t.get("_config");e&&i&&e.themes===this.hass.themes&&i.theme===this._config.theme||function(t,e,i,s){void 0===s&&(s=!1),t._themes||(t._themes={});var n=e.default_theme;("default"===i||i&&e.themes[i])&&(n=i);var r=St({},t._themes);if("default"!==n){var o=e.themes[n];Object.keys(o).forEach((function(e){var i="--"+e;t._themes[i]="",r[i]=o[e]}))}if(t.updateStyles?t.updateStyles(r):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,r),s){var a=document.querySelector("meta[name=theme-color]");if(a){a.hasAttribute("default-content")||a.setAttribute("default-content",a.getAttribute("content"));var l=r["--primary-color"]||a.getAttribute("default-content");a.setAttribute("content",l)}}}(this,this.hass.themes,this._config.theme)}willUpdate(t){if(!this.hass||!this._config||!t.has("hass"))return;const e=this.hass.states[this._config.entity];if(!e)return;const i=this.hass.states[this._config.humidity_entity];if(!i)return;const s=t.get("hass");s&&s.states[this._config.entity]===e||(this._targetHumidity=this._getTargetHumidity(e),this._previewHumidity=void 0),s&&s.states[this._config.humidity_entity]===i||(this._currentHumidity=this._getCurrentHumidity(i))}_getTargetHumidity(t){if(!Rt.includes(t.state))return t.attributes.humidity}_dragEvent(t){this._previewHumidity=t.detail.value}_setTargetHumidity(t){this._previewHumidity=void 0,this._targetHumidity=t.detail.value,this.hass.callService("humidifier","set_humidity",{entity_id:this._config.entity,humidity:t.detail.value})}_getCurrentHumidity(t){if(!Rt.includes(t.state)&&!isNaN(parseFloat(t.state)))return parseFloat(t.state)}_handleMoreInfo(){Et(this,"hass-more-info",{entityId:this._config.entity})}static get styles(){return _`
      :host {
        display: block;
      }

      ha-card {
        height: 100%;
        position: relative;
        overflow: hidden;
        --name-font-size: 1.2rem;
        --brightness-font-size: 1.2rem;
        --rail-border-color: transparent;
      }     
      .off {
        --mode-color: var(--state-climate-idle-color, var(--disabled-text-color, #9e9e9e));
      }
      .dry {
        --mode-color: var(--state-climate-heat-color, var(--orange-color, #ff9800));
      }
      .smart {
        --mode-color: var(--state-climate-cool-color, var(--blue-color, #2196f3));
      }
      .continuous {
        --mode-color: var(--state-climate-eco-color, var(--green-color, #4caf50));
      }
      .set {
        --mode-color: var(--state-climate-manual-color, var(--state-humidifier-on-color, var(--primary-color, #03a9f4)));
      }
      .unknown-mode {
        --mode-color: var(--state-unknown-color, var(--disabled-text-color, #9e9e9e));
      }
      .error {
        --mode-color: var(--error-color, #db4437);
      }

      .more-info {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        border-radius: 100%;
        color: var(--secondary-text-color);
        z-index: 1;
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      #controls {
        display: flex;
        justify-content: center;
        padding: 16px;
        position: relative;
      }

      #slider {
        height: 100%;
        width: 100%;
        position: relative;
        max-width: 320px;
        min-width: 100px;
        container-type: inline-size;
      }

      midea-humidity-slider {
        --midea-slider-track-color: var(--slider-track-color, var(--divider-color, #bdbdbd));
        --midea-slider-color: var(--mode-color);
        width: 100%;
      }

      #slider-center {
        position: absolute;
        width: 64%;
        height: 66cqi;
        box-sizing: border-box;
        border-radius: 100%;
        left: 18%;
        top: 15cqi;
        text-align: center;
        overflow-wrap: break-word;
        pointer-events: none;
      }

      #humidity {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: var(--primary-text-color);
      }

      .primary-humidity {
        font-size: clamp(32px, 20cqi, 64px);
        line-height: 1;
        font-weight: 400;
        white-space: nowrap;
      }
      .primary-humidity span {
        font-size: 0.4em;
        margin-inline-start: 4px;
      }
      .state-label, .secondary-values {
        font-size: clamp(10px, 4.5cqi, 16px);
        line-height: 1.5;
        color: var(--secondary-text-color);
      }

      #warnings {
        padding: 16px;
      }

      #info {
        text-align: center;
        padding: 0 16px 16px;
        font-size: var(--name-font-size);
      }

      .modes {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }

      .modes button, .modes > span {
        width: 40px;
        height: 40px;
        padding: 7px;
        border: 1px solid currentColor;
        border-radius: 50%;
        box-sizing: border-box;
        display: inline-grid;
        place-items: center;
        color: var(--secondary-text-color, #727272);
        background: transparent;
      }
      .modes button {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .modes svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
      .modes button:hover {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      }
      .modes button:active {
        background: var(--divider-color, rgba(127, 127, 127, 0.24));
      }
      .modes button:focus-visible {
        outline: 2px solid var(--primary-color, #03a9f4);
        outline-offset: 3px;
      }
      .modes .selected-icon {
        color: var(--mode-color);
      }

      .modes .defrost-icon {
        color: var(--state-climate-cool-color);
      }      

      .modes .ion-icon {
        color: var(--mode-color);
      }        

    `}};t([dt({attribute:!1})],Zt.prototype,"hass",void 0),t([ht()],Zt.prototype,"_config",void 0),t([ht()],Zt.prototype,"_targetHumidity",void 0),t([ht()],Zt.prototype,"_previewHumidity",void 0),t([ht()],Zt.prototype,"_currentHumidity",void 0),Zt=t([at("midea-humidifier-card")],Zt);let Wt=class extends ot{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _fan_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.fan_entity)||""}get _humidity_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.humidity_entity)||""}get _temperature_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.temperature_entity)||""}get _ion_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.ion_entity)||""}get _defrost_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.defrost_entity)||""}get _filter_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.filter_entity)||""}get _tank_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tank_entity)||""}get _show_ion_toggle(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_ion_toggle)||!1}get _swap_target_and_current_humidity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.swap_target_and_current_humidity)||!1}render(){if(!this.hass||!this._helpers)return j``;this._helpers.importMoreInfoControl("climate");const t=["sensor"],e=["binary_sensor"];return j`
      <div class="card-config">
        <ha-entity-picker
            .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("ui.panel.lovelace.editor.card.humidifier.name")}"
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${["humidifier"]}
            @change=${this._valueChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("state_attributes.climate.hvac_action.fan")}"
            .hass=${this.hass}
            .value=${this._fan_entity}
            .configValue=${"fan_entity"}
            .includeDomains=${["fan"]}
            @change=${this._valueChanged}
            allow-custom-entity
          ></ha-entity-picker>          
          <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("ui.card.weather.attributes.humidity")}"
          .hass=${this.hass}
          .value=${this._humidity_entity}
          .configValue=${"humidity_entity"}
          .includeDomains=${t}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("ui.card.weather.attributes.temperature")}"
          .hass=${this.hass}
          .value=${this._temperature_entity}
          .configValue=${"temperature_entity"}
          .includeDomains=${t}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ION Switch"
          .hass=${this.hass}
          .value=${this._ion_entity}
          .configValue=${"ion_entity"}
          .includeDomains=${["switch"]}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>        
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ${d("common.tank")}"
          .hass=${this.hass}
          .value=${this._tank_entity}
          .configValue=${"tank_entity"}
          .includeDomains=${e}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ${d("common.defrost")}"
          .hass=${this.hass}
          .value=${this._defrost_entity}
          .configValue=${"defrost_entity"}
          .includeDomains=${e}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>  
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ${d("common.filter")}"
          .hass=${this.hass}
          .value=${this._filter_entity}
          .configValue=${"filter_entity"}
          .includeDomains=${e}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>                                           
        <ha-formfield .label=${"Toggle ion toggle icon "+(this._show_ion_toggle?"off":"on")}>
          <ha-switch
            .checked=${!1!==this._show_ion_toggle}
            .configValue=${"show_ion_toggle"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield .label=${"Toggle swap current and target humidity display "+(this._swap_target_and_current_humidity?"off":"on")}>
          <ha-switch
            .checked=${!1!==this._swap_target_and_current_humidity}
            .configValue=${"swap_target_and_current_humidity"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>                                
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});Et(this,"config-changed",{config:this._config})}}static get styles(){return _`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};t([dt({attribute:!1})],Wt.prototype,"hass",void 0),t([ht()],Wt.prototype,"_config",void 0),t([ht()],Wt.prototype,"_helpers",void 0),Wt=t([at("midea-humidifier-card-editor")],Wt);var Jt=Object.freeze({__proto__:null,get MideaHumidifierCardEditor(){return Wt}});export{Zt as MideaHumidifierCard,Ut as computeObjectId,Nt as computeStateName,It as findEntities,Dt as isValidEntityId,jt as processConfigEntities};
